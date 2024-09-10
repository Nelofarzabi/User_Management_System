import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 


jest.mock('../../../models', () => ({
  Comment: {
    create: jest.fn(),
  },
}));

describe('addComment', () => {
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
        content: 'This is a test comment',
        userId: 1,
        postId: 1,
        parentId: 1, 
      },
    };

    res = {
      status: statusMock,
    };
  });

  it('should add a comment successfully', async () => {
    const commentMock = {
      id: 1,
      content: 'This is a test comment',
      userId: 1,
      postId: 1,
      parentId: 1,
    };

    (Comment.create as jest.Mock).mockResolvedValue(commentMock);

    await commentController.addComment(req as Request, res as Response);

    expect(Comment.create).toHaveBeenCalledWith({
      content: 'This is a test comment',
      userId: 1,
      postId: 1,
      parentId: 1,
    });
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'Comment added successfully',
      comment: commentMock,
    });
  });

  it('should handle server error', async () => {
    (Comment.create as jest.Mock).mockRejectedValue(new Error('Create failed'));

    await commentController.addComment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
