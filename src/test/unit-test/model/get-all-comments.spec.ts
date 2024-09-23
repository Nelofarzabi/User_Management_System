import { Comment } from '../../../models/Comment';
import { User } from '../../../models/User';
import { Post } from '../../../models/Post';

describe('Comment Model - getAllComments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all comments with associated User, Post, and replies', async () => {
    const mockComments = [
      {
        id: 1,
        content: 'This is a comment',
        userId: 1,
        postId: 1,
        User: { id: 1, first_name: 'Nelofar', last_name: 'Zabi' },
        Post: { id: 1, title: 'Sample Post' },
      },
      {
        id: 2,
        content: 'This is another comment',
        userId: 2,
        postId: 1,
        User: { id: 2, first_name: 'Nelofar', last_name: 'Zabi' },
        Post: { id: 1, title: 'Sample Post' },
      },
    ];

    jest.spyOn(Comment, 'findAll').mockResolvedValue(mockComments as any);

    const result = await Comment.getAllComments();

    expect(Comment.findAll).toHaveBeenCalledWith({
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
        { model: Post, attributes: ['id', 'title'] },
        { model: Comment, as: 'replies' },
      ],
    });

    expect(result).toEqual(mockComments);
  });

  it('should throw an error if Comment.findAll fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Comment, 'findAll').mockRejectedValue(mockError);

    await expect(Comment.getAllComments()).rejects.toThrow('Database error');

    expect(Comment.findAll).toHaveBeenCalled();
  });
});
