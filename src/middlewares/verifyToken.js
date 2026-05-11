import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import AppError from "#utils/appError.js";
configDotenv();
export default function verifyToken(req, res, next) {
    let token = String(req.headers.authorization).split(" ")[1];
    let user;
    try {
        user = jwt.verify(token, process.env.ACCESS_JWT_KEY);
    } catch (err) {
        throw new AppError("Access Denied", 401);
    }
    if (user.type !== "access") throw AppError("Access Denied", 401);
    req.user = user;
    next();
}
