import { Request, Response } from 'express';
import { Comment } from '../models';
import { ICreateComment } from '../interfaces/comment.interface';

class CommentController {

  addComment = async (req: Request, res: Response) => {
    try {
      const commentData = req.body as ICreateComment;
      const comment = await Comment.addComment(commentData);
      res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  getAllComments = async (req: Request, res: Response) => {
    try {
      const comments = await Comment.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  getCommentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const comment = await Comment.getCommentById(parseInt(id));
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  updateComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const updatedComment = await Comment.updateCommentById(parseInt(id), content);
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  deleteComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const isDeleted = await Comment.deleteCommentById(parseInt(id));
      if (isDeleted) {
        res.status(200).json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Comment not found' });
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
}

const commentController: CommentController = new CommentController();
export default commentController;
