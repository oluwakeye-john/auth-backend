import { Log } from '../../logger'
import UserModel, { User } from '../../Model/User'
import { comparePassword, generateAccessToken, generateTokens, hashPassword } from '../../Utils'
import { Service } from '../type'
import { RegisterPayload, LoginPayload, RefreshPayload } from './types'

const checkIfUserExists = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email })
    return Boolean(user)
  } catch {
    return false
  }
}

interface UpdatePasswordProps {
  password: string
}

const updateStringWithHash = async (data: UpdatePasswordProps) => {
  const password = data.password
  const hash = await hashPassword(password)
  return {
    ...data,
    password: hash,
  }
}

interface AccountServiceSuccess {
  email?: string
  access_token: string
  refresh_token: string
}

interface AccountService extends Service {
  data: AccountServiceSuccess | string
}

const updateRefreshTokensArray = async (user: User, refresh_token: string) => {
  try {
    console.log('updating refresh token')
    await UserModel.updateOne({ id: user.id }, { $push: { refresh_tokens: refresh_token } })
    console.log('done')
  } catch (e) {
    console.log('failed to update refresh token')
  }
}

const createUser = async (_data: RegisterPayload): Promise<AccountService> => {
  try {
    Log('info', 'Create user', 'account')
    const isExist = await checkIfUserExists(_data.email)
    if (isExist) {
      return {
        status: false,
        data: 'user already exist',
      }
    }
    const data = await updateStringWithHash(_data)
    const user = new UserModel(data)
    await user.save()
    const { email } = user
    const { access_token, refresh_token } = generateTokens(user.id)
    updateRefreshTokensArray(user, refresh_token)

    return {
      status: true,
      data: { email, access_token, refresh_token },
    }
  } catch (err) {
    Log('error', err.message, 'account')
    const error = 'Error creating user'
    return { status: false, data: error }
  }
}

const loginUser = async (data: LoginPayload): Promise<AccountService> => {
  try {
    Log('info', 'User login', 'account')
    const { email, password } = data
    const user = await UserModel.findOne({ email } as User).select(['id', 'password', 'email'])
    if (user && user.id) {
      const isValidPassword = await comparePassword(password, user.password)
      if (isValidPassword) {
        const { access_token, refresh_token } = generateTokens(user.id)
        await updateRefreshTokensArray(user, refresh_token)
        return { status: true, data: { email, access_token, refresh_token } }
      } else {
        const error = 'Incorrect username/password combination'
        return { status: false, data: error }
      }
    } else {
      const error = `${data?.email} not found`
      Log('error', error)
      return { status: false, data: error }
    }
  } catch (err) {
    const error = String(err)
    Log('error', error, 'account')
    return { status: false, data: error }
  }
}

const refreshToken = async (data: RefreshPayload): Promise<AccountService> => {
  const { refresh_token } = data
  const user = await UserModel.findOne({ email: data.email }).select(['refresh_tokens', 'id'])
  if (user && user.id) {
    const email = user?.email
    if (user?.refresh_tokens?.includes(refresh_token)) {
      const access_token = generateAccessToken(user.id)
      return { status: true, data: { email, access_token, refresh_token } }
    } else {
      console.log('invalid')
    }
  } else {
    console.log('user not found')
  }
  return {
    status: true,
    data: 'hello world',
  }
}

const AccountServices = { loginUser, createUser, refreshToken }

export default AccountServices
