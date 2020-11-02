import express from 'express'
import { protectedRoute } from '../Middlewares/account'
import accountRouter from './account'
import productRouter from './product'

const router = express.Router()

router.use('/account', accountRouter)
router.use(protectedRoute)
router.use('/product', productRouter)

export default router
