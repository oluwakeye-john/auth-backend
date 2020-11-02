import { getModelForClass, prop } from '@typegoose/typegoose'
import { generateId } from '../Utils'

export class User {
  @prop({ default: generateId })
  id!: string

  @prop({ required: true })
  name!: string

  @prop({ required: true, unique: true, lowercase: false })
  email!: string

  @prop({ required: true, select: false })
  password!: string

  @prop({ default: [] })
  refresh_tokens: string[]
}

const UserModel = getModelForClass(User)
export default UserModel
