import request from 'supertest';
import express from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment, User, Post } from '../../../models'; 

const app = express();
app.use(express.json());

app.get('/get-comments', commentController.getAllComments);

jest.mock('../../../models', () => ({
  Comment: {
    findAll: jest.fn(),
  },
  User: {},
  Post: {},
}));

describe('GET /get-comments', () => {
  it('should retrieve all comments successfully', async () => {
    const comments = [
      { id: 1, content: 'Great post!', userId: 1, postId: 1 },
      { id: 2, content: 'Interesting read.', userId: 2, postId: 1 }
    ];

    (Comment.findAll as jest.Mock).mockResolvedValue(comments);

    const response = await request(app)
      .get('/get-comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comments);
  });

  it('should handle server error', async () => {
    (Comment.findAll as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .get('/get-comments');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
