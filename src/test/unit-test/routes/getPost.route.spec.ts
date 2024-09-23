import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 

const app = express();
app.use(express.json());
app.get('/get-posts', postController.getAllPosts);


jest.mock('../../../models', () => ({
  Post: {
    getAllPosts: jest.fn(), 
  },
}));

describe('GET /get-posts', () => {
  it('should retrieve all posts successfully', async () => {
    const posts = [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' }
    ];

    (Post.getAllPosts as jest.Mock).mockResolvedValue(posts);

    const response = await request(app)
      .get('/get-posts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(posts);
  });

  it('should handle server error', async () => {
    (Post.getAllPosts as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .get('/get-posts');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
