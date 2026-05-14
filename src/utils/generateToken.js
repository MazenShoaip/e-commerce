import jwt from "jsonwebtoken";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { addItem } from "#repositories/databaseRepository.js";

configDotenv();

export default async function generateToken(user, type, expire) {
    let jti = crypto.randomUUID();
    let token = jwt.sign(
        { ...user, jti, type, createdAt: new Date() },
        process.env[type.toUpperCase() + "_JWT_KEY"],
        {
            expiresIn: expire,
        },
    );

    if (type == "refresh") await addItem({ jti: jti }, "tokens");
    return token;
}

// console.log(await generateToken({ user: "demo" },'access', "7d"));
