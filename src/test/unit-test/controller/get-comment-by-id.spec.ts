import { Request, Response } from 'express';
import commentController from '../../../controllers/commentController'; 
import { Comment, User, Post } from '../../../models'; 

jest.mock('../../../models', () => ({
  Comment: {
    findByPk: jest.fn(),
  },
  User: {},
  Post: {},
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
      params: {
        id: '1',
      },
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
      replies: 1,
      user: { id: 1, first_name: 'John', last_name: 'Doe' },
      post: { id: 1, title: 'Test Post' },
    };

    (Comment.findByPk as jest.Mock).mockResolvedValue(commentMock);

    await commentController.getCommentById(req as Request, res as Response);

    expect(Comment.findByPk).toHaveBeenCalledWith('1', {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(commentMock);
  });

  it('should return 404 if the comment is not found', async () => {
    (Comment.findByPk as jest.Mock).mockResolvedValue(null);

    await commentController.getCommentById(req as Request, res as Response);

    expect(Comment.findByPk).toHaveBeenCalledWith('1', {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Comment not found' });
  });

  it('should handle server error', async () => {
    (Comment.findByPk as jest.Mock).mockRejectedValue(new Error('Find by PK failed'));

    await commentController.getCommentById(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
