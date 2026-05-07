import signupService from "../services/signupService.js";

export default async function signupController(req, res,next) {
    let result = await signupService(req.body, req.app.locals.db)
    res.status(201).json({ success: true, ...result  });
}
