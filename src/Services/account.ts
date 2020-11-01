import { Request, Response } from 'express'
import UserModel, { User } from '../Model/User'

const loginUser = (req: Request, res: Response) => {
  const user = new UserModel({} as User)
}

const AccountServices = { loginUser }

export default AccountServices
