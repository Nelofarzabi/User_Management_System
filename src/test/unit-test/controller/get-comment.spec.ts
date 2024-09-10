import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment, User, Post } from '../../../models'; 


jest.mock('../../../models', () => ({
  Comment: {
    findAll: jest.fn(),
  },
  User: {},
  Post: {},
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
        replies: 1,
        user: { id: 1, first_name: 'John', last_name: 'Doe' },
        post: { id: 1, title: 'Test Post' },
      },
    ];

    (Comment.findAll as jest.Mock).mockResolvedValue(commentsMock);

    await commentController.getAllComments(req as Request, res as Response);

    expect(Comment.findAll).toHaveBeenCalledWith({
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(commentsMock);
  });

  it('should handle server error', async () => {
    (Comment.findAll as jest.Mock).mockRejectedValue(new Error('Find all failed'));

    await commentController.getAllComments(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
