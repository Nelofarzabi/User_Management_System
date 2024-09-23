import { Request, Response } from 'express';
import postController from '../../../controllers/postController';
import { Post } from '../../../models';

jest.mock('../../../models', () => ({
  Post: {
    createPost: jest.fn(),
  },
}));

describe('addPost', () => {
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
      body: {
        title: 'Test Post',
        content: 'This is a test post',
        userId: 1,
      },
    };

    res = {
      status: statusMock,
    };
  });

  it('should create a post successfully', async () => {
    const postMock = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    };

    (Post.createPost as jest.Mock).mockResolvedValue(postMock);

    await postController.addPost(req as Request, res as Response);

    expect(Post.createPost).toHaveBeenCalledWith({
      title: 'Test Post',
      content: 'This is a test post',
      userId: 1,
    });

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Post created successfully',
      post: postMock,
    });
  });

  it('should handle server error', async () => {
    (Post.createPost as jest.Mock).mockRejectedValue(new Error('Create failed'));

    await postController.addPost(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
