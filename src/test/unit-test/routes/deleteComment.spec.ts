import request from 'supertest';
import express from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models';

const app = express();
app.use(express.json());

app.delete('/delete-comment/:id', commentController.deleteComment);

jest.mock('../../../models', () => ({
  Comment: {
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('DELETE /delete-comment/:id', () => {
  it('should delete a comment successfully', async () => {
    const commentMock = { id: 1, destroy: jest.fn() };

    (Comment.findByPk as jest.Mock).mockResolvedValue(commentMock);

    const response = await request(app)
      .delete('/delete-comment/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Comment deleted successfully');
    expect(Comment.findByPk).toHaveBeenCalledWith('1');
    expect(commentMock.destroy).toHaveBeenCalled();
  });

  it('should handle comment not found', async () => {
    (Comment.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .delete('/delete-comment/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Comment not found');
  });

  it('should handle server error', async () => {
    (Comment.findByPk as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .delete('/delete-comment/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
