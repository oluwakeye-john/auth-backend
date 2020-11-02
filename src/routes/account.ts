import express from 'express'
import AccountController from '../Controllers/account'
const router = express.Router()

router.post('/login', AccountController.Login)
router.post('/register', AccountController.Register)
router.post('/refresh', AccountController.GenerateRefreshToken)

const accountRouter = router
export default accountRouter
