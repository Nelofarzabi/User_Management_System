import { Request, Response } from 'express';
import postController from '../../../controllers/postController'; 
import { Post, Comment, User } from '../../../models'; 

jest.mock('../../../models', () => ({
  Post: {
    findAll: jest.fn(),},
  Comment: {},
  User: {},
}));

describe('getAllPosts', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });

    req = {};
    res = {
      status: statusMock,
    };
  });

  it('should return all posts successfully', async () => {
    const postsMock = [
      { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
      { id: 2, title: 'Post 2', content: 'Content 2', userId: 2 },
    ];

    (Post.findAll as jest.Mock).mockResolvedValue(postsMock);

    await postController.getAllPosts(req as Request, res as Response);

    expect(Post.findAll).toHaveBeenCalledWith({ include: [Comment, User] });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(postsMock);
  });

  it('should handle server error', async () => {
    (Post.findAll as jest.Mock).mockRejectedValue(new Error('Find all failed'));

    await postController.getAllPosts(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
