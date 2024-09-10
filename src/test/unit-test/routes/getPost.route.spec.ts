import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 

const app = express();
app.use(express.json());

app.get('/get-posts', postController.getAllPosts);

jest.mock('../../../models', () => ({
  Post: {
    findAll: jest.fn(),
  },
}));

describe('GET /get-posts', () => {
  it('should retrieve all posts successfully', async () => {
    const postsMock = [
      { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
      { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
    ];

    (Post.findAll as jest.Mock).mockResolvedValue(postsMock);

    const response = await request(app)
      .get('/get-posts');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(postsMock); 
    expect(Post.findAll).toHaveBeenCalled();
  });

  it('should handle server error', async () => {
    (Post.findAll as jest.Mock).mockRejectedValue(new Error('Find all failed'));

    const response = await request(app)
      .get('/get-posts');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
