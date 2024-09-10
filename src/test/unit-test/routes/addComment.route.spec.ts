import request from 'supertest';
import express from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 
import validate from '../../../middlewares/validate'; 
import { commentValidations } from '../../../validations/comment.validation'; 

const app = express();
app.use(express.json());

app.post('/add-comment', validate(commentValidations.addComment), commentController.addComment);

jest.mock('../../../models', () => ({
  Comment: {
    create: jest.fn(),
  },
}));

describe('POST /add-comment', () => {
  it('should add a comment successfully', async () => {
    const commentData = { content: 'Great post!', userId: 1, postId: 1, parentId: 1};
    const createdComment = { ...commentData, id: 1 };

    (Comment.create as jest.Mock).mockResolvedValue(createdComment);

    const response = await request(app)
      .post('/add-comment')
      .send(commentData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Comment added successfully');
    expect(response.body.comment).toEqual(createdComment);
  });

  it('should handle server error', async () => {
    (Comment.create as jest.Mock).mockRejectedValue(new Error('Create failed'));
  
    const response = await request(app)
      .post('/add-comment')
      .send({ content: 'Great post!', userId: 1, postId: 1, parentId: null });
  
    expect(response.status).toBe(500);
    expect(response.text).toContain('Error'); 
  });
  
});
