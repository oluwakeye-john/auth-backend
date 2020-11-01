import { Request, Response } from 'express'

const Test = (req: Request, res: Response) => {
  res.send('hello world')
}

const Login = (req: Request, res: Response) => {
  const { name, email, password } = req.body
  res.send(name)
}

const AccountController = { Login, Test }

export default AccountController
