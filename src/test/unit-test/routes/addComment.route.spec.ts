import request from 'supertest';
import express from 'express';
import commentRoutes from '../../../routes/comment.routes';
import { Comment } from '../../../models';

// Create and configure the Express app for testing
const app = express();
app.use(express.json());
app.use(commentRoutes);

// Mock the Comment model
jest.mock('../../../models', () => ({
  Comment: {
    addComment: jest.fn(),
  },
}));

describe('POST /add-comment', () => {
  it('should add a comment successfully', async () => {
    const commentData = { content: 'New comment', userId: 1, postId: 1 };
    const addedComment = { id: 1, ...commentData };

    (Comment.addComment as jest.Mock).mockResolvedValue(addedComment);

    const response = await request(app)
      .post('/add-comment')
      .send(commentData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Comment added successfully');
    expect(response.body.comment).toEqual(addedComment);
  });

  it('should handle server error on adding a comment', async () => {
    const commentData = { content: 'New comment', userId: 1, postId: 1 };

    (Comment.addComment as jest.Mock).mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/add-comment')
      .send(commentData);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
