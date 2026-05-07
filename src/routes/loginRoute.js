import express from "express";
import loginController from "../controllers/loginController.js";

const loginRoute = express.Router();
loginRoute.post("/", loginController);

export default loginRoute;
