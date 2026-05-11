import addProductService from "../services/product/addProductService.js";
import getProductsService from "../services/product/getProductsService.js";
import AppError from "../utils/appError.js";

export async function addProductController(req, res, next) {
    if (req.user.role !== "admin") throw new AppError("Access Denied", 401);
    let result = await addProductService(req.body, res);
    res.status(201).json({ success: true, ...result });
}
export async function getProductsController(req, res, next) {
    let result = await getProductsService(req.body, res);
    res.status(201).json({ success: true, ...result });
}
