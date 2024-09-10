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
    create: jest.fn(),
  },
}));

describe('POST /add-post', () => {
  it('should create a post successfully', async () => {
    const postMock = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    };

    (Post.create as jest.Mock).mockResolvedValue(postMock);

    const response = await request(app)
      .post('/add-post')
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Post created successfully');
    expect(response.body.post).toEqual(postMock);
    expect(Post.create).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    });
  });

  it('should handle server error', async () => {
    (Post.create as jest.Mock).mockRejectedValue(new Error('Create failed'));

    const response = await request(app)
      .post('/add-post')
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        userId: 1,
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
