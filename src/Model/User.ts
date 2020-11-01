import { getModelForClass, prop } from '@typegoose/typegoose'

export class User {
  @prop()
  id: string

  @prop({ required: true })
  name!: string

  @prop({ required: true })
  email!: string

  @prop({ required: true })
  password!: string
}

const UserModel = getModelForClass(User)
export default UserModel
