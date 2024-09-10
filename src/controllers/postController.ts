import { Request, Response } from 'express';
import { Post, Comment, User } from '../models';

class PostController {

  addPost = async (req: Request, res: Response) => {
    try {
      const { title, content, userId } = req.body;
      const post = await Post.create({ title, content, userId });
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await Post.findAll({ include: [Comment, User] });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }

  getPostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, { include: [Comment, User] });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }

  updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.update({ title, content });
    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

  deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
}

const postController : PostController = new PostController();
export default postController;
