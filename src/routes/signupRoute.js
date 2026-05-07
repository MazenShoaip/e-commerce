import express from "express";
import signupController from "../controllers/signupController.js";

const signupRoute = express.Router();
signupRoute.post("/", signupController);

export default signupRoute;
