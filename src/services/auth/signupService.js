import {
    addItem,
    findItem,
} from "#repositories/databaseRepository.js";
import userSignupSchema from "#schemas/userSignupSchema.js";
import AppError from "#utils/appError.js";
import bcrypt from "bcrypt";
import sendEmail from "#services/emailService.js";
import generateOTP from "#utils/generateOTP.js";

export default async function signupService(body) {
    let verify = userSignupSchema.safeParse(body);
    if (!verify.success) throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    if (await findItem({ userName: data.userName }, "users"))
        throw new AppError("Username is already used", 409);
    if (await findItem({ email: data.email }, "users"))
        throw new AppError("Email is already used", 409);

    let password = await bcrypt.hash(data.password, 10);
    let otpCode = generateOTP();
    let otp = await bcrypt.hash(String(otpCode), 10);
    let signupData = { ...data, password, otp, role: "user" };
    signupData.createdAt = new Date();
    let result = await addItem(signupData, "pendingUsers");
    await sendEmail({
        to: signupData.email,
        subject: "otp code",
        text: `Your otp is ${otpCode}`,
    });
    return { success: true, id: result.insertedId, message: "Message is sent" };
}
