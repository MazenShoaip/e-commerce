import userSignupSchema from "#schemas/userSignupSchema.js";
import AppError from "#utils/appError.js";
import bcrypt from "bcrypt";
import sendEmail from "#services/emailService.js";
import generateOTP from "#utils/generateOTP.js";
import { addItem, findItem } from "#repositories/databaseRepository.js";

export default async function signupService(body) {
    let verify = userSignupSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    let foundUsers = (
        await findItem(
            { username: data.username, email: data.email },
            "users",
            1,
            false,
        )
    ).rows[0];
    if (foundUsers) {
        let err = foundUsers.username == data.username ? "Username" : "Email";
        throw new AppError(err, "is already used", 409);
    }

    let password = await bcrypt.hash(data.password, 10);
    let otpCode = generateOTP();
    let otp = await bcrypt.hash(String(otpCode), 10);
    let signupData = { ...data, password, otp, role: "user" };
    let result = await addItem(signupData, "pending_users");
    await sendEmail({
        to: signupData.email,
        subject: "otp code",
        text: `Your otp is ${otpCode}`,
    });
    return { success: true, id: result.rows[0].id, message: "Message is sent" };
}
