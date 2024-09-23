import { Request, Response } from 'express';
import { Post } from '../models';
import { ICreatePost } from '../interfaces/post.interface';

class PostController {

  addPost = async (req: Request, res: Response) => {
    try {
      const data: ICreatePost = req.body;
      const post = await Post.createPost(data);
      res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await Post.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  getPostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await Post.getPostById(Number(id));
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  updatePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<ICreatePost> = req.body;
      const post = await Post.updatePostById(Number(id), updatedData);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Post.deletePostById(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
}

const postController: PostController = new PostController();
export default postController;
