import { Request, Response } from 'express';
import { Comment, Post, User } from '../models';

class CommentController {

  addComment = async (req: Request, res: Response) => {
    try {
      const { content, userId, postId, parentId } = req.body;
      const comment = await Comment.create({ content, userId, postId, parentId });
      res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  

  getAllComments = async (req: Request, res: Response) => {
    try {
      const comments = await Comment.findAll({
        include: [
          { model: User, attributes: ['id', 'first_name', 'last_name'] },
          { model: Post, attributes: ['id', 'title'] },
          { model: Comment, as: 'replies' }
        ]
      });
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }


  getCommentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'first_name', 'last_name'] },
          { model: Post, attributes: ['id', 'title'] },
          { model: Comment, as: 'replies' } 
        ]
      });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
     } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  
  updateComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      await comment.update({ content });
      res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }


  deleteComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      await comment.destroy();
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
  
}

const commentController : CommentController = new CommentController();
export default commentController;
