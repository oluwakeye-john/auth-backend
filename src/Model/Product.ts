import { getModelForClass, prop } from '@typegoose/typegoose'
import { generateId } from '../Utils/index'

export class Product {
  @prop({ default: generateId })
  id?: string

  @prop({ required: true })
  name!: string

  @prop({ default: Date.now })
  createdOn?: string

  @prop({ required: true })
  price!: number

  @prop({ required: true })
  description?: string
}

const ProductModel = getModelForClass(Product)
export default ProductModel
