import express, { Request, Response } from 'express'
import AccountController from '../Controllers/account'
import ProductController from '../Controllers/post'
const router = express.Router()

router.get('/', ProductController.GetAll)

const postRouter = router
export default postRouter
