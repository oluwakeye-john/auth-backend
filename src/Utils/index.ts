import nanoid, { customAlphabet } from 'nanoid'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const alphabets = 'abcdefghijklmnopqrstuvwxyz1234567890'

export const generateId = (): string => {
  return customAlphabet(alphabets, 6)()
}

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcryptjs.hash(password, 10)
  return hash
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcryptjs.compare(password, hash)
  } catch {
    return false
  }
}

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_ACCESS, {
    expiresIn: '5m',
  })
}

export const generateRefreshToken = (id: string): string => {
  return nanoid.nanoid(20)
}

export const decodeToken = (
  token: string,
  type: 'REFRESH' | 'ACCESS' = 'ACCESS'
): string | false => {
  let key = process.env.JWT_ACCESS

  if (type === 'REFRESH') {
    key = process.env.JWT_REFRESH
  }

  try {
    const _ = jwt.verify(token, key)
    if (typeof _ === 'object') {
      const res: any = _
      const { id } = res
      return id
    }
    return false
  } catch {
    return false
  }
}

export const generateTokens = (id: string) => {
  const access_token = generateAccessToken(id)
  const refresh_token = generateRefreshToken(id)
  return { access_token, refresh_token }
}
