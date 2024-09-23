import { Comment } from '../../../models/Comment';
import { ICreateComment } from '../../../interfaces/comment.interface';

describe('Comment Model - addComment', () => {
  const mockCommentData: ICreateComment = {
    content: 'This is a comment',
    userId: 1,
    postId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a comment successfully and return it', async () => {
    const mockComment = {
      id: 1,
      content: 'This is a comment',
      userId: 1,
      postId: 1,
    };

    jest.spyOn(Comment, 'create').mockResolvedValue(mockComment as any);

    const result = await Comment.addComment(mockCommentData);

    expect(Comment.create).toHaveBeenCalledWith(mockCommentData);
    expect(result).toEqual(mockComment);
  });

  it('should throw an error if Comment.create fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Comment, 'create').mockRejectedValue(mockError);

    await expect(Comment.addComment(mockCommentData)).rejects.toThrow('Database error');

    expect(Comment.create).toHaveBeenCalledWith(mockCommentData);
  });
});
