import request from 'supertest';
import express from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 

const app = express();
app.use(express.json());

app.delete('/delete-post/:id', postController.deletePost);

jest.mock('../../../models', () => ({
  Post: {
    deletePostById: jest.fn(),
  },
}));
describe('DELETE /delete-post/:id', () => {
  it('should delete a post successfully', async () => {
    const postId = 1;

    (Post.deletePostById as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .delete(`/delete-post/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Post deleted successfully');
  });

  it('should handle post not found', async () => {
    const postId = 1;

    (Post.deletePostById as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .delete(`/delete-post/${postId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post not found');
  });

  it('should handle server error', async () => {
    (Post.deletePostById as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    const response = await request(app)
      .delete('/delete-post/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
