import { Log } from '../logger'
import PostModel, { Post } from '../Model/Post'

export const getAllPosts = async () => {
  Log('info', 'Reading DB', 'post')
  const posts = await PostModel.find()
  return posts
}

const PostServices = { getAllPosts }

export default PostServices
