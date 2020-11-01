import { getModelForClass, prop } from '@typegoose/typegoose'

export class Post {
  @prop()
  id: string

  @prop({ required: true })
  title!: string

  @prop({ default: Date.now })
  date?: string

  @prop({ default: '' })
  body!: string
}

const PostModel = getModelForClass(Post)
export default PostModel
