import { configDotenv } from "dotenv";
import { deleteItem } from "#repositories/databaseRepository.js";
import AppError from "#utils/appError.js";
import generateToken from "#utils/generateToken.js";
import storeRefreshToken from "#utils/storeRefreshToken.js";
import jwt from "jsonwebtoken";
configDotenv();

export default async function refreshTokenService(token, res) {
    let user;
    try {
        user = jwt.verify(token, process.env.REFRESH_JWT_KEY);
    } catch (err) {
        throw new AppError("Access Denied", 401);
    }
    if (user.type !== "refresh") throw new AppError("Access Denied", 401);
    let tokenUser = await deleteItem({ jti: user.jti }, "refreshTokens");
    if (!tokenUser) throw new AppError("Access Denied", 401);
    let accessToken = await generateToken(
        { sub: user.sub, role: user.role },
        "access",
        "15m",
    );

    let refreshToken = await generateToken(
        { sub: user.sub, role: user.role },
        "refresh",
        "1d",
    );
    storeRefreshToken(refreshToken, res);
    return { success: true, accessToken };
}
