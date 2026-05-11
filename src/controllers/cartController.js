import setCartService from "#services/cart/setCartService.js";
import getCartService from "#services/cart/getCartService.js";
import AppError from "#utils/appError.js";

export async function setCartController(req, res, next) {
    let result = await setCartService(req.body, req.user);
    res.status(201).json({ success: true, ...result });
}

export async function getCartController(req, res, next) {
    let result = await getCartService(req.user);
    res.status(200).json({ success: true, result });
}
