import { Request, Response } from 'express'
import PostServices from '../Services/post'

const GetAll = async (req: Request, res: Response) => {
  try {
    const posts = await PostServices.getAllPosts()
    return res.status(200).json(posts)
  } catch (err) {
    //
  }
}

const ProductController = { GetAll }

export default ProductController
