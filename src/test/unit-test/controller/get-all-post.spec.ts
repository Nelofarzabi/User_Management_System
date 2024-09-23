import { Request, Response } from 'express';
import postController from '../../../controllers/postController';
import { Post } from '../../../models';

jest.mock('../../../models', () => ({
  Post: {
    deletePostById: jest.fn(), 
  },
  Comment: {},
  User: {},
}));

describe('deletePost', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });

    req = {
      params: {
        id: '1',
      },
    };
    res = {
      status: statusMock,
    };
  });

  it('should delete a post successfully', async () => {
    (Post.deletePostById as jest.Mock).mockResolvedValue(true);

    await postController.deletePost(req as Request, res as Response);

    expect(Post.deletePostById).toHaveBeenCalledWith(1); 
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
  });

  it('should return 404 if the post is not found', async () => {
    (Post.deletePostById as jest.Mock).mockResolvedValue(false);

    await postController.deletePost(req as Request, res as Response);

    expect(Post.deletePostById).toHaveBeenCalledWith(1); 
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Post not found' });
  });

  it('should handle server error', async () => {
    (Post.deletePostById as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    await postController.deletePost(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
