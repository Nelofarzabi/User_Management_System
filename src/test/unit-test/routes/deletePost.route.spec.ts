import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 

const app = express();
app.use(express.json());

app.delete('/delete-post/:id', postController.deletePost);

jest.mock('../../../models', () => ({
  Post: {
    findByPk: jest.fn(),
  },
}));

describe('DELETE /delete-post/:id', () => {
  it('should delete a post successfully', async () => {
    const mockPost = { id: '1', destroy: jest.fn() }; 
    (Post.findByPk as jest.Mock).mockResolvedValue(mockPost);

    const response = await request(app)
      .delete('/delete-post/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted successfully');
    expect(Post.findByPk).toHaveBeenCalledWith('1'); 
    expect(mockPost.destroy).toHaveBeenCalled();
  });

  it('should handle post not found', async () => {
    (Post.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .delete('/delete-post/1');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });

  it('should handle server error', async () => {
    (Post.findByPk as jest.Mock).mockRejectedValue(new Error('Find failed'));

    const response = await request(app)
      .delete('/delete-post/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
