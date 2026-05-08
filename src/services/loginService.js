import { findUser } from "../Repositories/userRepository.js";
import userLoginSchema from "../schemas/userLoginSchema.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import storeRefreshToken from "../utils/storeRefreshToken.js";
export default async function loginService(body, db, res) {
    let verify = userLoginSchema.safeParse(body);
    if (!verify.success) throw new AppError(verify.error.message, 400);

    let data = verify.data;
    let user = await findUser({ email: data.email }, "users", db);
    if (!user) throw new AppError("Email is not found", 404);
    let passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new AppError("Invalid email or password", 401);
    let accessToken = await generateToken(
        { sub: user._id, role: user.role },
        "access",
        "15m",
    );

    let refreshToken = await generateToken(
        { sub: user._id, role: user.role },
        "refresh",
        "15m",
        db,
    );
    storeRefreshToken(refreshToken, res);
    return { success: true, accessToken };
}
