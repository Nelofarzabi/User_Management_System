import request from 'supertest';
import express from 'express';
import commentRoutes from '../../../routes/comment.routes';
import { Comment } from '../../../models';

const app = express();
app.use(express.json());
app.use(commentRoutes);

jest.mock('../../../models', () => ({
  Comment: {
    getCommentById: jest.fn(),
  },
}));

describe('GET /get-comment/:id', () => {
  it('should retrieve a comment by ID successfully', async () => {
    const commentId = 1;
    const comment = { id: commentId, content: 'Comment content' };

    (Comment.getCommentById as jest.Mock).mockResolvedValue(comment);

    const response = await request(app)
      .get(`/get-comment/${commentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comment);
  });

  it('should return 404 if comment is not found', async () => {
    const commentId = 1;

    (Comment.getCommentById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get(`/get-comment/${commentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Comment not found');
  });

  it('should handle server error on retrieving a comment', async () => {
    const commentId = 1;

    (Comment.getCommentById as jest.Mock).mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .get(`/get-comment/${commentId}`);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
