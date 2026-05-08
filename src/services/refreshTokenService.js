import { configDotenv } from "dotenv";
import { removeToken } from "../Repositories/tokenRepository.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import storeRefreshToken from "../utils/storeRefreshToken.js";
import jwt from "jsonwebtoken";
configDotenv();

export default async function loginService(token, db, res) {
    let user;
    try {
        user = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        throw new AppError("Access Denied", 401);
    }
    let tokenUser = removeToken({ jti: user.jti }, "refreshTokens", db);
    if (!tokenUser) throw new AppError("Access Denied", 401);
    let accessToken = await generateToken(
        { sub: user._id, role: user.role },
        "access",
        "15m",
    );

    let refreshToken = await generateToken(
        { sub: user._id, role: user.role },
        "refresh",
        "1d",
        db,
    );
    storeRefreshToken(refreshToken, res);
    return { success: true, accessToken };
}
