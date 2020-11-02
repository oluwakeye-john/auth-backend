import { Request, Response } from 'express'
import ProductServices from '../Services/product'

const GetAll = async (req: Request, res: Response) => {
  try {
    const posts = await ProductServices.getAllProducts()
    return res.status(200).json(posts)
  } catch (err) {
    //
  }
}

const Create = async (req: Request, res: Response) => {
  const { name, price, description } = req.body
  try {
    const product = await ProductServices.createProduct({
      name,
      price,
      description,
    })
  } catch {}
}

const ProductController = { GetAll, Create }

export default ProductController
