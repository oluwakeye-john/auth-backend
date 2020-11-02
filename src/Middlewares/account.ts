import { NextFunction, Response } from 'express'
import { AuthRequest } from '../@types'
import { Log } from '../logger'
import { decodeToken } from '../Utils'

export const protectedRoute = (req: AuthRequest, res: Response, next: NextFunction) => {
  // access token is stored in the authorization header
  const access_token = req.headers?.authorization?.split('Bearer ')[1]

  // refresh token is stored in an httpOnly coocki

  const refresh_token = req.cookies['x-refresh-token']
  try {
    if (access_token && refresh_token) {
      const access = decodeToken(access_token)

      if (access && refresh_token) {
        console.log(access, refresh_token)
        req.access = access
        req.refresh = refresh_token
        Log('info', 'User authenticated', 'account')
        next()
      } else {
        throw Error('Invalid tokens')
      }
    } else {
      throw Error('tokens not supplied')
    }
  } catch (error: any) {
    Log('error', error.message, 'account')
    return res.status(401).json({
      data: {
        message: 'Unauthorized',
      },
    })
  }
}
