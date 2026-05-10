import addProductService from "../services/product/addProductService.js";
import AppError from "../utils/appError.js";

export async function addProductController(req, res, next) {
    if (req.user.role !== "admin") throw new AppError("Access Denied", 401);
    let result = await addProductService(req.body, req.app.locals.db, res);
    res.status(201).json({ success: true, ...result });
}
