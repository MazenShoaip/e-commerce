import { findItem } from "#repositories/databaseRepository.js";
import userLoginSchema from "#schemas/userLoginSchema.js";
import AppError from "#utils/appError.js";
import bcrypt from "bcrypt";
import generateToken from "#utils/generateToken.js";
import storeRefreshToken from "#utils/storeRefreshToken.js";
export default async function loginService(body, res) {
    let verify = userLoginSchema.safeParse(body);
    if (!verify.success)
        throw new AppError("Invalid " + verify.error.issues[0].path[0], 400);

    let data = verify.data;
    if (!data.userName && !data.email) throw new AppError("Invalid Data", 400);

    let id = { ...data };
    delete id.password;
    let user = await findItem(id, "users");
    if (!user) throw new AppError("User is not found", 404);
    let passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new AppError("Invalid email or password", 401);
    let accessToken = await generateToken(
        { sub: user._id, role: user.role },
        "access",
        "1d",
    );

    let refreshToken = await generateToken(
        { sub: user._id, role: user.role },
        "refresh",
        "1d",
    );
    storeRefreshToken(refreshToken, res);
    return { accessToken };
}
