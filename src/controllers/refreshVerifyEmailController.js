import refreshVerifyEmailService from "../services/refreshVerifyEmailService.js";

export default async function refreshVerifyEmailController(req, res, next) {
    let result = await refreshVerifyEmailService(req.body, req.app.locals.db);
    res.status(201).json({ success: true, ...result });
}
