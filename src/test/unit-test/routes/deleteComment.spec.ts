import request from 'supertest';
import express from 'express';
import commentRoutes from '../../../routes/comment.routes';
import { Comment } from '../../../models';

const app = express();
app.use(express.json());
app.use(commentRoutes);

jest.mock('../../../models', () => ({
  Comment: {
    deleteCommentById: jest.fn(),
  },
}));

describe('DELETE /delete-comment/:id', () => {
  it('should delete a comment successfully', async () => {
    const commentId = 1;

    (Comment.deleteCommentById as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .delete(`/delete-comment/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comment deleted successfully');
  });

  it('should return 404 if the comment to delete is not found', async () => {
    const commentId = 1;

    (Comment.deleteCommentById as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .delete(`/delete-comment/${commentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Comment not found');
  });

  it('should handle server error on deleting a comment', async () => {
    const commentId = 1;

    (Comment.deleteCommentById as jest.Mock).mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .delete(`/delete-comment/${commentId}`);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
