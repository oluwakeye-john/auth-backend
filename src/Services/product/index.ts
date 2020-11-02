import { Log } from '../../logger'
import ProductModel, { Product } from '../../Model/Product'

export const getAllProducts = async () => {
  Log('info', 'Reading product from DB', 'product')
  try {
    const products = await ProductModel.find()
    return products
  } catch (error) {
    Log('error')
  }
}

interface CreateProductProps {
  name: string
  description: string
  price: number
}

export const createProduct = async ({ name, description, price }: CreateProductProps) => {
  Log('info', 'Create product', 'product')
  const post = new ProductModel({
    name,
    price,
    description,
  } as Product)
  await post.save()
}

const ProductServices = { getAllProducts, createProduct }

export default ProductServices
