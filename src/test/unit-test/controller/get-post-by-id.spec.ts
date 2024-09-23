import { Request, Response } from 'express';
import postController from '../../../controllers/postController'; 
import { Post } from '../../../models'; 

jest.mock('../../../models', () => ({
  Post: {
    getPostById: jest.fn(),
  },
}));

describe('getPostById', () => {
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

  it('should retrieve a post by ID successfully', async () => {
    const postMock = {
      id: 1,
      title: 'Post Title',
      content: 'Post Content',
    };

    (Post.getPostById as jest.Mock).mockResolvedValue(postMock);

    await postController.getPostById(req as Request, res as Response);

    expect(Post.getPostById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(postMock);
  });

  it('should return 404 if the post is not found', async () => {
    (Post.getPostById as jest.Mock).mockResolvedValue(null);

    await postController.getPostById(req as Request, res as Response);

    expect(Post.getPostById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Post not found' });
  });

  it('should handle server error', async () => {
    (Post.getPostById as jest.Mock).mockRejectedValue(new Error('Find failed'));

    await postController.getPostById(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
