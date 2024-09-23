import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 

jest.mock('../../../models', () => ({
  Comment: {
    getCommentById: jest.fn(),
  },
}));

describe('getCommentById', () => {
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
      params: { id: '1' }, 
    };
    res = {
      status: statusMock,
    };
  });

  it('should retrieve a comment by ID successfully', async () => {
    const commentMock = {
      id: 1,
      content: 'This is a test comment',
      userId: 1,
      postId: 1,
    };

    (Comment.getCommentById as jest.Mock).mockResolvedValue(commentMock);

    await commentController.getCommentById(req as Request, res as Response);

    expect(Comment.getCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(commentMock);
  });

  it('should handle comment not found', async () => {
    (Comment.getCommentById as jest.Mock).mockResolvedValue(null);

    await commentController.getCommentById(req as Request, res as Response);

    expect(Comment.getCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment not found' });
  });

  it('should handle server error', async () => {
    (Comment.getCommentById as jest.Mock).mockRejectedValue(new Error('Find by ID failed'));

    await commentController.getCommentById(req as Request, res as Response);

    expect(Comment.getCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
