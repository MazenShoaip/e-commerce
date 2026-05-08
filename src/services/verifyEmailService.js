import { ObjectId } from "mongodb";
import { addUser, findUser } from "../Repositories/userRepository.js";
import verifyEmailSchema from "../schemas/verifyEmailSchema.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
export default async function verifyEmailService(body, db) {
    let verify = verifyEmailSchema.safeParse(body);
    if (!verify.success) throw new AppError(verify.error.message, 400);
    let data = verify.data;
    let user = await findUser(
        { _id: new ObjectId(data.id) },
        "pendingUsers",
        db,
    );
    if (!user) throw new AppError("ID was not found", 404);
    if (300000 < new Date() - user.createdAt)
        throw new AppError("Expired OTP", 401);
    let match = await bcrypt.compare(data.otp, user.otp);
    if (!match) throw new AppError("Invalid OTP", 401);
    let findEmail = await findUser({ email: user.email }, "users", db);
    if (findEmail) throw new AppError("Email is already used", 409);
    let finduser = await findUser({ userName: user.userName }, "users", db);
    if (finduser) throw new AppError("User Name is already used", 409);
    let signupData = { ...user };
    delete signupData.otp;
    await addUser(signupData, "users", db);
    return { success: true, message: "Email verified" };
}
