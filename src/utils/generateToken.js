import jwt from "jsonwebtoken";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { addToken } from "../Repositories/tokenRepository.js";

configDotenv();

export default async function generateToken(
    user,
    type,
    expire,
    db = undefined,
) {
    let jti = crypto.randomUUID();
    user.jti = jti;
    let token = jwt.sign(
        { jti, type, createdAt: new Date(), ...user },
        process.env.JWT_KEY,
        {
            expiresIn: expire,
        },
    );
    if (type == "refresh") await addToken({ jti }, "refreshTokens", db);
    return token;
}

// generateToken({ user: "demo" },'refresh', "7d");
