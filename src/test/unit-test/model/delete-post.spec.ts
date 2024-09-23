import { Post } from '../../../models/Post';

describe('Post Model - deletePostById', () => {
  const mockPost = {
    id: 1,
    destroy: jest.fn().mockResolvedValue(true),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the post if it exists and return true', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(mockPost as any);

    const result = await Post.deletePostById(1);

    expect(Post.findByPk).toHaveBeenCalledWith(1);
    expect(mockPost.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return false if no post is found with the specified ID', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(null);

    const result = await Post.deletePostById(2);

    expect(Post.findByPk).toHaveBeenCalledWith(2);
    expect(result).toBe(false);
  });

  it('should throw an error if Post.findByPk fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Post, 'findByPk').mockRejectedValue(mockError);

    await expect(Post.deletePostById(1)).rejects.toThrow('Database error');

    expect(Post.findByPk).toHaveBeenCalledWith(1);
  });

  it('should throw an error if post.destroy fails', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(mockPost as any);

    const mockDestroyError = new Error('Destroy error');
    mockPost.destroy.mockRejectedValueOnce(mockDestroyError);

    await expect(Post.deletePostById(1)).rejects.toThrow('Destroy error');

    expect(Post.findByPk).toHaveBeenCalledWith(1);
    expect(mockPost.destroy).toHaveBeenCalled();
  });
});
