import express, { Request, Response } from 'express'
import ProductController from '../Controllers/product'
const router = express.Router()

router.get('/', ProductController.GetAll)

const postRouter = router
export default postRouter
