import { Request } from 'express'

export interface AuthRequest extends Request {
  access?: string
  refresh?: string
}
