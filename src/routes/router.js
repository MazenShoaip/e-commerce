import express from 'express'
import authRoute from './authRouter.js'
import productRoute from "./productRoute.js";

let router = express.Router()

router.use('/auth', authRoute)

router.use('/product/', productRoute)

export default router