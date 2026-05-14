import { addItem, findItem } from "#repositories/databaseRepository.js";
import verifyEmailSchema from "#schemas/verifyEmailSchema.js";
import AppError from "#utils/appError.js";
import bcrypt from "bcrypt";
export default async function verifyEmailService(body) {
    let verify = verifyEmailSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    let user = (await findItem({ id: data.id }, "pending_users")).rows[0];
    if (!user) throw new AppError("ID was not found", 404);
    if (300000 < Date.now() - new Date(user.created_at + "Z").getTime())
        throw new AppError("Expired OTP", 401);
    let match = await bcrypt.compare(data.otp, user.otp);
    if (!match) throw new AppError("Invalid OTP", 401);
    let foundUsers = (
        await findItem(
            { username: user.username, email: user.email },
            "users",
            1,
            false,
        )
    ).rows[0];
    if (foundUsers) {
        let err = foundUsers.username == data.username ? "Username" : "Email";
        throw new AppError(err + " is already used", 409);
    }

    delete user.otp;
    delete user.created_at;
    await addItem(user, "users");
    return { success: true, message: "Email verified" };
}
