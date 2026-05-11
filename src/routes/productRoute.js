import express from "express";
import * as productController from "#controllers/productController.js";
import verifyToken from "#middlewares/verifyToken.js";

const productRoute = express.Router();
productRoute.post("/add", verifyToken, productController.addProductController);
productRoute.delete(
    "/delete",
    verifyToken,
    productController.removeProductController,
);
productRoute.patch(
    "/update",
    verifyToken,
    productController.updateProductController,
);
productRoute.get("/products", productController.getProductsController);

export default productRoute;
