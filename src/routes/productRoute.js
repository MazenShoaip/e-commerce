import express from "express";
import * as productController from "../controllers/productController.js";
import verifyToken from "../middlewares/verifyToken.js";

const productRoute = express.Router();
productRoute.post("/", verifyToken, productController.addProductController);

export default productRoute;
