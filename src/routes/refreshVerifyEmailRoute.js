import express from "express";
import refreshVerifyEmailController from "../controllers/refreshVerifyEmailController.js";

const refreshVerifyEmailRoute = express.Router();
refreshVerifyEmailRoute.post("/", refreshVerifyEmailController);

export default refreshVerifyEmailRoute;
