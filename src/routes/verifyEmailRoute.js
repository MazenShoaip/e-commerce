import express from "express";
import verifyEmailController from "../controllers/verifyEmailController.js";

const verifyEmailRoute = express.Router();
verifyEmailRoute.post("/", verifyEmailController);

export default verifyEmailRoute;
