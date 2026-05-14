import addProductService from "#services/product/addProductService.js";
import updateProductService from "#services/product/updateProductService.js";
import getProductsService from "#services/product/getProductsService.js";
import removeProductService from "#services/product/deleteProductService.js";
import AppError from "#utils/appError.js";

export async function addProductController(req, res, next) {
    if (req.user.role !== "admin") throw new AppError("Access Denied", 401);
    let result = await addProductService(req.body);
    res.status(201).json({ success: true, ...result });
}
export async function removeProductController(req, res, next) {
    if (req.user.role !== "admin") throw new AppError("Access Denied", 401);
    let result = await removeProductService(req.body);
    if (result.result === 0) throw new AppError("Item was not found", 400);
    res.status(200).json({ success: true, ...result });
}
export async function updateProductController(req, res, next) {
    if (req.user.role !== "admin") throw new AppError("Access Denied", 401);
    let result = await updateProductService(req.body);
    if (result.matchedCount === 0)
        throw new AppError("Item was not found", 400);
    res.status(200).json({ success: true, result });
}
export async function getProductsController(req, res, next) {
    let result = await getProductsService();
    res.status(200).json({ success: true, result });
}
