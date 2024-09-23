import { Comment } from '../../../models/Comment';
import { User } from '../../../models/User';
import { Post } from '../../../models/Post';

describe('Comment Model - getCommentById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a comment by ID with associated user, post, and replies', async () => {
    const mockComment = {
      id: 1,
      content: 'This is a comment',
      userId: 1,
      postId: 1,
      user: { id: 1, first_name: 'Nelofar', last_name: 'Zabi' },
      post: { id: 1, title: 'Test Post' },
    };

    jest.spyOn(Comment, 'findByPk').mockResolvedValue(mockComment as any);

    const result = await Comment.getCommentById(1);

    expect(Comment.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });

    expect(result).toEqual(mockComment);
  });

  it('should return null if no comment is found by ID', async () => {
    jest.spyOn(Comment, 'findByPk').mockResolvedValue(null);

    const result = await Comment.getCommentById(1);

    expect(Comment.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });

    expect(result).toBeNull();
  });

  it('should throw an error if Comment.findByPk fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Comment, 'findByPk').mockRejectedValue(mockError);

    await expect(Comment.getCommentById(1)).rejects.toThrow('Database error');
    expect(Comment.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });
  });
});
