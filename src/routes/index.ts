import express from 'express'
import accountRouter from './account'
import postRouter from './post'

const router = express.Router()

router.use('/account', accountRouter)
router.use('/post', postRouter)

export default router
