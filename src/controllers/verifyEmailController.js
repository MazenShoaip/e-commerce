import verifyEmailService from "../services/verifyEmailService.js";

export default async function verifyEmailController(req, res, next) {
    let result = await verifyEmailService(req.body, req.app.locals.db);
    res.status(201).json({ success: true, ...result });
}
