import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 

jest.mock('../../../models', () => ({
  Comment: {
    deleteCommentById: jest.fn(),
  },
}));

describe('deleteComment', () => {
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

  it('should delete a comment successfully', async () => {
    (Comment.deleteCommentById as jest.Mock).mockResolvedValue(true);

    await commentController.deleteComment(req as Request, res as Response);

    expect(Comment.deleteCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
  });

  it('should handle comment not found', async () => {
    (Comment.deleteCommentById as jest.Mock).mockResolvedValue(false);

    await commentController.deleteComment(req as Request, res as Response);

    expect(Comment.deleteCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment not found' });
  });

  it('should handle server error', async () => {
    (Comment.deleteCommentById as jest.Mock).mockRejectedValue(new Error('Delete failed'));

    await commentController.deleteComment(req as Request, res as Response);

    expect(Comment.deleteCommentById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
