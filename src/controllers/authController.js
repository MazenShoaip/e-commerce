import signupService from "../services/auth/signupService.js";
import loginService from "../services/auth/loginService.js";
import refreshTokenService from "../services/auth/refreshTokenService.js";
import refreshVerifyEmailService from "../services/auth/refreshVerifyEmailService.js";
import verifyEmailService from "../services/auth/verifyEmailService.js";

export async function loginController(req, res, next) {
    let result = await loginService(req.body, res);
    res.status(200).json({ success: true, ...result });
}

export async function signupController(req, res, next) {
    let result = await signupService(req.body);
    res.status(201).json({ success: true, ...result });
}

export async function verifyEmailController(req, res, next) {
    let result = await verifyEmailService(req.body);
    res.status(201).json({ success: true, ...result });
}

export async function refreshVerifyEmailController(req, res, next) {
    let result = await refreshVerifyEmailService(req.body);
    res.status(201).json({ success: true, ...result });
}

export async function refreshTokenController(req, res, next) {
    let result = await refreshTokenService(req.cookies.refreshToken, res);
    res.status(200).json({ success: true, ...result });
}
