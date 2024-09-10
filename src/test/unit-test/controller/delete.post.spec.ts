import { Request, Response } from 'express';
import postController from '../../../controllers/postController';
import { Post } from '../../../models'; 


jest.mock('../../../models', () => ({
  Post: {
    findByPk: jest.fn(),
  },
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
    const postMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(undefined), 
    };

    (Post.findByPk as jest.Mock).mockResolvedValue(postMock);

    await postController.deletePost(req as Request, res as Response);

    expect(Post.findByPk).toHaveBeenCalledWith('1');
    expect(postMock.destroy).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Post deleted successfully' });
  });

  it('should return 404 if the post is not found', async () => {
    (Post.findByPk as jest.Mock).mockResolvedValue(null);

    await postController.deletePost(req as Request, res as Response);

    expect(Post.findByPk).toHaveBeenCalledWith('1');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Post not found' });
  });

  it('should handle server error', async () => {
    (Post.findByPk as jest.Mock).mockRejectedValue(new Error('Find by PK failed'));

    await postController.deletePost(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
