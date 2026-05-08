import refreshTokenService from "../services/refreshTokenService.js";

export default async function refreshTokenController(req, res, next) {
    let result = await refreshTokenService(
        req.cookies.refreshToken,
        req.app.locals.db,res
    );
    res.status(200).json({ success: true, ...result });
}
