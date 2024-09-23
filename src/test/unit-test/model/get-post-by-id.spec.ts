import { Post } from '../../../models/Post'; 
import { Comment } from '../../../models/Comment'; 
import { User } from '../../../models/User'; 

describe('Post Model - getPostById', () => {
  const mockPost = {
    id: 1,
    title: 'First Post',
    content: 'This is the first post.',
    userId: 1,
    Comments: [
      { id: 1, content: 'First comment', postId: 1, userId: 1 },
    ],
    User: {
      id: 1,
      firstName: 'Nelo',
      lastName: 'Zabi',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the post with the specified ID, including comments and user', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(mockPost as any);

    const result = await Post.getPostById(1);
    expect(Post.findByPk).toHaveBeenCalledWith(1, { include: [Comment, User] });
    expect(result).toEqual(mockPost);
  });

  it('should return null if no post is found with the specified ID', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(null);
    const result = await Post.getPostById(2);
    expect(Post.findByPk).toHaveBeenCalledWith(2, { include: [Comment, User] });

    expect(result).toBeNull();
  });

  it('should throw an error if Post.findByPk fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Post, 'findByPk').mockRejectedValue(mockError);
    await expect(Post.getPostById(1)).rejects.toThrow('Database error');
    expect(Post.findByPk).toHaveBeenCalledWith(1, { include: [Comment, User] });
  });
});
