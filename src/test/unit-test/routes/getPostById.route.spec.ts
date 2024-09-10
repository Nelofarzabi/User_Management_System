import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 
import { Comment, User } from '../../../models'; 

const app = express();
app.use(express.json());

app.get('/get-post/:id', postController.getPostById);

jest.mock('../../../models', () => ({
  Post: {
    findByPk: jest.fn(),
  },
  Comment: {}, 
  User: {}, 
}));

describe('GET /get-post/:id', () => {
  it('should retrieve a post by ID successfully', async () => {
    const postMock = { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 };

    (Post.findByPk as jest.Mock).mockResolvedValue(postMock);

    const response = await request(app)
      .get('/get-post/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(postMock);
    expect(Post.findByPk).toHaveBeenCalledWith('1', { include: [Comment, User] });
  });

  it('should handle post not found', async () => {
    (Post.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get('/get-post/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });

  it('should handle server error', async () => {
    (Post.findByPk as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .get('/get-post/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
