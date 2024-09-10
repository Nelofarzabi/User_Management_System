import request from 'supertest';
import express from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment, User, Post } from '../../../models'; 

const app = express();
app.use(express.json());

app.get('/get-comment/:id', commentController.getCommentById);

jest.mock('../../../models', () => ({
  Comment: {
    findByPk: jest.fn(),
  },
  User: {},
  Post: {},
}));

describe('GET /get-comment/:id', () => {
  it('should retrieve a comment by ID successfully', async () => {
    const comment = { id: 1, content: 'Great post!', userId: 1, postId: 1 };

    (Comment.findByPk as jest.Mock).mockResolvedValue(comment);

    const response = await request(app)
      .get('/get-comment/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comment);
  });

  it('should handle comment not found', async () => {
    (Comment.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/get-comment/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Comment not found');
  });

  it('should handle server error', async () => {
    (Comment.findByPk as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .get('/get-comment/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
