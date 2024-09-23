import request from 'supertest';
import express from 'express';
import commentRoutes from '../../../routes/comment.routes';
import { Comment } from '../../../models';

const app = express();
app.use(express.json());
app.use(commentRoutes);

jest.mock('../../../models', () => ({
  Comment: {
    getAllComments: jest.fn(),
  },
}));

describe('GET /get-comments', () => {
  it('should retrieve all comments successfully', async () => {
    const comments = [{ id: 1, content: 'Comment 1' }, { id: 2, content: 'Comment 2' }];

    (Comment.getAllComments as jest.Mock).mockResolvedValue(comments);

    const response = await request(app)
      .get('/get-comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comments);
  });

  it('should handle server error on retrieving comments', async () => {
    (Comment.getAllComments as jest.Mock).mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .get('/get-comments');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
