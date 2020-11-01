import express, { Request, Response } from 'express'
import AccountController from '../Controllers/account'
const router = express.Router()

router.get('/', AccountController.Test)
router.post('/login', AccountController.Login)

const accountRouter = router
export default accountRouter
