import idSchema from "#schemas/idSchema.js";
import AppError from "#utils/appError.js";
import bcrypt from "bcrypt";
import generateOTP from "#utils/generateOTP.js";
import sendEmail from "#services/emailService.js";
import { findItem, updateItem } from "#repositories/databaseRepository.js";
export default async function refreshVerifyEmailService(body) {
    let verify = idSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    let user = (await findItem({ id: data.id }, "pending_users")).rows[0];
    if (!user) throw new AppError("ID was not found", 400);
    let otp = generateOTP();
    let hashedOTP = await bcrypt.hash(String(otp), 10);
    await updateItem(
        { otp: hashedOTP, created_at: new Date().toISOString() },
        { id: data.id },
        "pending_users",
    );
    await sendEmail({
        to: user.email,
        subject: "otp code",
        text: `Your otp is ${otp}`,
    });
    return { success: true, message: "OTP refresh message is sent" };
}
