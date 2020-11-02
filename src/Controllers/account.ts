import { Request, Response } from 'express'
import { AuthRequest } from '../@types'
import { Log } from '../logger'
import AccountServices from '../Services/account'
import { LoginValidator, RefreshValidator, RegisterValidator } from '../validation/account'

const Return = (res: Response, code: number, data: any) => {
  return res.status(code).json({
    data,
  })
}

const setCookies = (res: Response, refresh: string) => {
  const secureStatus = false
  res.cookie('x-refresh-token', refresh, { httpOnly: true, secure: secureStatus })
}

const Register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const _data = { name, email, password }
  const error = RegisterValidator(_data)
  if (error) {
    Log('info', `Validation error: ${error}`)
    return Return(res, 400, { error })
  }

  const { status, data } = await AccountServices.createUser(_data)
  if (status && typeof data === 'object') {
    const { access_token, refresh_token } = data
    setCookies(res, refresh_token)
    return Return(res, 201, { message: 'Account created', email, access_token })
  } else {
    return Return(res, 400, data)
  }
}

const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const _data = { email, password }
  const error = LoginValidator(_data)
  if (error) {
    Log('info', `Validation error: ${error}`)
    return Return(res, 400, { error })
  }
  const { status, data } = await AccountServices.loginUser({ email, password })

  if (status && typeof data === 'object') {
    const { access_token, refresh_token } = data
    setCookies(res, refresh_token)

    return Return(res, 200, {
      message: 'Login successful',
      email,
      access_token,
    })
  } else {
    return Return(res, 400, data)
  }
}

const GenerateRefreshToken = async (req: AuthRequest, res: Response) => {
  const refresh_token = req.cookies['x-refresh-token']
  const { email } = req.body

  const error = RefreshValidator({ email, refresh_token })

  if (error) {
    return Return(res, 400, error)
  } else {
    const { status, data } = await AccountServices.refreshToken({ email, refresh_token })

    if (status && typeof data === 'object') {
      const { email, access_token } = data
      setCookies(res, refresh_token)
      return Return(res, 200, { email, access_token })
    } else {
      return Return(res, 400, data)
    }
  }
}

const AccountController = { Login, Register, GenerateRefreshToken }

export default AccountController
