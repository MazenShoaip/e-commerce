import loginService from "../services/loginService.js";

export default async function loginController(req, res, next) {
    let result = await loginService(req.body, req.app.locals.db, res);
    res.status(200).json({ success: true, ...result });
}
