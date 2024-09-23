import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController';
import { Post } from '../../../models';


const app = express();
app.use(express.json());
app.get('/get-post/:id', postController.getPostById);


jest.mock('../../../models', () => ({
  Post: {
    getPostById: jest.fn(),
    createPost: jest.fn(),
    updatePostById: jest.fn(),
    deletePostById: jest.fn(),
    getAllPosts: jest.fn(),
  },
}));

describe('GET /get-post/:id', () => {
  it('should retrieve a post by ID successfully', async () => {
    const postId = 1;
    const post = { id: postId, title: 'Post Title', content: 'Post Content' };

   
    (Post.getPostById as jest.Mock).mockResolvedValue(post);

    const response = await request(app)
      .get(`/get-post/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(post);
  });

  it('should handle post not found', async () => {
    const postId = 1;

   
    (Post.getPostById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get(`/get-post/${postId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });

  it('should handle server error', async () => {
    
    (Post.getPostById as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .get('/get-post/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
