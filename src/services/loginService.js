import { findUser } from "../Repositories/userRepository.js";
import userLoginSchema from "../schemas/userLoginSchema.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
export default async function loginService(body, db) {
    let verify = userLoginSchema.safeParse(body);
    if (!verify.success) throw new AppError(verify.error.message, 400);

    let data = verify.data;
    let user = await findUser({ email: data.email }, "users", db);
    if (!user) throw new AppError("Email is not found", 404);
    let passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new AppError("Invalid email or password", 401);

    return { success: true};
}
