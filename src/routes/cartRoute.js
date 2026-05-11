import express from "express";
import * as cartController from "#controllers/cartController.js";
import verifyToken from "#middlewares/verifyToken.js";

const cartRoute = express.Router();
cartRoute.post("/add", verifyToken, cartController.setCartController);
// cartRoute.delete("/delete", verifyToken, cartController.removeCartController);
// cartRoute.patch("/update", verifyToken, cartController.updateCartController);
cartRoute.get("/", verifyToken, cartController.getCartController);

export default cartRoute;
