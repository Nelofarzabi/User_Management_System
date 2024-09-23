import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 
import { ICreateComment } from '../../../interfaces/comment.interface';

jest.mock('../../../models', () => ({
  Comment: {
    addComment: jest.fn(),
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
        content: 'This is a new comment',
        userId: 1,
        postId: 1,
      } as ICreateComment,
    };
    res = {
      status: statusMock,
    };
  });

  it('should add a comment successfully', async () => {
    const commentMock = {
      id: 1,
      content: 'This is a new comment',
      userId: 1,
      postId: 1,
    };

    (Comment.addComment as jest.Mock).mockResolvedValue(commentMock);

    await commentController.addComment(req as Request, res as Response);

    expect(Comment.addComment).toHaveBeenCalledWith(req.body);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment added successfully', comment: commentMock });
  });

  it('should handle server error', async () => {
    (Comment.addComment as jest.Mock).mockRejectedValue(new Error('Add comment failed'));

    await commentController.addComment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
