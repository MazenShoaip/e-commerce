import express from "express";
import refreshTokenController from "../controllers/refreshTokenController.js";

const refreshTokenRoute = express.Router();
refreshTokenRoute.post("/", refreshTokenController);

export default refreshTokenRoute;
