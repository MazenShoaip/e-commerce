import {
    addUser,
    findUser,
    findUsers,
} from "../../Repositories/userRepository.js";
import userSignupSchema from "../../schemas/userSignupSchema.js";
import AppError from "../../utils/appError.js";
import bcrypt from "bcrypt";
import sendEmail from "../emailService.js";
import generateOTP from "../../utils/generateOTP.js";

export default async function signupService(body, db) {
    let verify = userSignupSchema.safeParse(body);
    if (!verify.success) throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    if (await findUser({ userName: data.userName }, "users", db))
        throw new AppError("Username is already used", 409);
    if (await findUser({ email: data.email }, "users", db))
        throw new AppError("Email is already used", 409);

    let password = await bcrypt.hash(data.password, 10);
    let otpCode = generateOTP();
    let otp = await bcrypt.hash(String(otpCode), 10);
    let signupData = { ...data, password, otp, role: "admin" };
    signupData.createdAt = new Date();
    let result = await addUser(signupData, "pendingUsers", db);
    await sendEmail({
        to: signupData.email,
        subject: "otp code",
        text: `Your otp is ${otpCode}`,
    });
    return { success: true, id: result.insertedId, message: "Message is sent" };
}
