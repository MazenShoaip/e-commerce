import express from 'express'
import authRoute from '#routes/authRouter.js'
import productRoute from "#routes/productRoute.js";
import cartRoute from '#routes/cartRoute.js';

let router = express.Router()

router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)

export default router