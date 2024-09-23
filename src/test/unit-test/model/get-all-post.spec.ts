import { Post } from '../../../models/Post';
import { Comment } from '../../../models/Comment'; 
import { User } from '../../../models/User'; 

describe('Post Model - getAllPosts', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first post.',
      userId: 1,
      User: {
        id: 1,
        firstName: 'Nelo',
        lastName: 'Zabi',
      },
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second post.',
      userId: 2,
      User: {
        id: 2,
        firstName: 'Zuhra',
        lastName: 'Hashimi',
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of posts including comments and users', async () => {
    jest.spyOn(Post, 'findAll').mockResolvedValue(mockPosts as any);

    const result = await Post.getAllPosts();
    expect(Post.findAll).toHaveBeenCalledWith({ include: [Comment, User] });
    expect(result).toEqual(mockPosts);
  });

  it('should throw an error if Post.findAll fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Post, 'findAll').mockRejectedValue(mockError);

    await expect(Post.getAllPosts()).rejects.toThrow('Database error');
    expect(Post.findAll).toHaveBeenCalledWith({ include: [Comment, User] });
  });
});
