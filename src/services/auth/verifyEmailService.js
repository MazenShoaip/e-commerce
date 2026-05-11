import { ObjectId } from "mongodb";
import { addItem, findItem } from "../../Repositories/databaseRepository.js";
import verifyEmailSchema from "../../schemas/verifyEmailSchema.js";
import AppError from "../../utils/appError.js";
import bcrypt from "bcrypt";
export default async function verifyEmailService(body) {
    let verify = verifyEmailSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);
    let data = verify.data;
    let user = await findItem({ _id: new ObjectId(data.id) }, "pendingUsers");
    if (!user) throw new AppError("ID was not found", 404);
    if (300000 < new Date() - user.createdAt)
        throw new AppError("Expired OTP", 401);
    let match = await bcrypt.compare(data.otp, user.otp);
    if (!match) throw new AppError("Invalid OTP", 401);
    let findEmail = await findItem({ email: user.email }, "users");
    if (findEmail) throw new AppError("Email is already used", 409);
    let finduser = await findItem({ userName: user.userName }, "users");
    if (finduser) throw new AppError("User Name is already used", 409);
    let signupData = { ...user };
    delete signupData.otp;
    await addItem(signupData, "users");
    return { success: true, message: "Email verified" };
}
