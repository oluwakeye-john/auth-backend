import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { Log } from './logger'
import router from './routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(router)

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) return Log('error', err)
    Log('info', 'Database connected')
  }
)

app.listen(process.env.PORT, () => {
  Log('info', `App starting @ ${new Date().toLocaleTimeString()}`)
  Log('info', `listening ON ${PORT}`)
})
