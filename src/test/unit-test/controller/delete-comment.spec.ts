import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 


jest.mock('../../../models', () => ({
  Comment: {
    findByPk: jest.fn(),
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
      params: {
        id: '1',
      },
    };
    res = {
      status: statusMock,
    };
  });

  it('should delete a comment successfully', async () => {
    const commentMock = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(undefined), 
    };

    (Comment.findByPk as jest.Mock).mockResolvedValue(commentMock);

    await commentController.deleteComment(req as Request, res as Response);

    expect(Comment.findByPk).toHaveBeenCalledWith('1');
    expect(commentMock.destroy).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment deleted successfully' });
  });

  it('should return 404 if the comment is not found', async () => {
    (Comment.findByPk as jest.Mock).mockResolvedValue(null);

    await commentController.deleteComment(req as Request, res as Response);

    expect(Comment.findByPk).toHaveBeenCalledWith('1');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment not found' });
  });

  it('should handle server error', async () => {
    (Comment.findByPk as jest.Mock).mockRejectedValue(new Error('Find by PK failed'));

    await commentController.deleteComment(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
