import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController';
import { Post } from '../../../models';
import validate from '../../../middlewares/validate';
import { postValidations } from '../../../validations/post.validation';

const app = express();
app.use(express.json());
app.post('/add-post', validate(postValidations.addPost), postController.addPost);

jest.mock('../../../models', () => ({
  Post: {
    createPost: jest.fn(),
  },
}));

describe('POST /add-post', () => {
  it('should create a post successfully', async () => {
    const postData = { title: 'New Post', content: 'Post Content', userId: 1 };
    const createdPost = { id: 1, ...postData };

    (Post.createPost as jest.Mock).mockResolvedValue(createdPost);

    const response = await request(app)
      .post('/add-post')
      .send(postData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created successfully');
    expect(response.body.post).toEqual(createdPost);
  });

  it('should handle server error', async () => {
    (Post.createPost as jest.Mock).mockRejectedValue(new Error('Create failed'));

    const response = await request(app)
      .post('/add-post')
      .send({ title: 'New Post', content: 'Post Content', userId: 1 });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
