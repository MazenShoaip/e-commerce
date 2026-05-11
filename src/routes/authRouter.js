import express from "express";
import * as authController from "#controllers/authController.js";

const authRoute = express.Router();
authRoute.post("/login", authController.loginController);
authRoute.post("/signup", authController.signupController);
authRoute.post("/otp/email", authController.verifyEmailController);
authRoute.post(
    "/otp/refresh/email",
    authController.refreshVerifyEmailController,
);
authRoute.post("/token/refresh", authController.refreshTokenController);

export default authRoute;
