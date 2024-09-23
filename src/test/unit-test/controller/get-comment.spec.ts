import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment } from '../../../models'; 

jest.mock('../../../models', () => ({
  Comment: {
    getAllComments: jest.fn(),
  },
}));

describe('getAllComments', () => {
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

  it('should retrieve all comments successfully', async () => {
    const commentsMock = [
      {
        id: 1,
        content: 'This is a test comment',
        userId: 1,
        postId: 1,
      },
      {
        id: 2,
        content: 'This is another comment',
        userId: 2,
        postId: 1,
      },
    ];

    (Comment.getAllComments as jest.Mock).mockResolvedValue(commentsMock);

    await commentController.getAllComments(req as Request, res as Response);

    expect(Comment.getAllComments).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(commentsMock);
  });

  it('should handle server error', async () => {
    (Comment.getAllComments as jest.Mock).mockRejectedValue(new Error('Find all failed'));

    await commentController.getAllComments(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
