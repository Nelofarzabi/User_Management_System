import { Post } from '../../../models/Post'; 

describe('Post Model - updatePostById', () => {
  const mockPost = {
    id: 1,
    title: 'Original Title',
    content: 'Original content',
    update: jest.fn().mockResolvedValue(true), 
  };

  const updatedData = {
    title: 'Updated Title',
    content: 'Updated content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the post if it exists and return the updated post', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(mockPost as any);
    const result = await Post.updatePostById(1, updatedData);
    expect(Post.findByPk).toHaveBeenCalledWith(1);
    expect(mockPost.update).toHaveBeenCalledWith(updatedData);

    expect(result).toEqual(mockPost);
  });

  it('should return null if no post is found with the specified ID', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(null);
    const result = await Post.updatePostById(2, updatedData);
    expect(Post.findByPk).toHaveBeenCalledWith(2);
   
    expect(result).toBeNull();
  });

  it('should throw an error if Post.findByPk fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Post, 'findByPk').mockRejectedValue(mockError);
    await expect(Post.updatePostById(1, updatedData)).rejects.toThrow('Database error');

    expect(Post.findByPk).toHaveBeenCalledWith(1);
  });

  it('should throw an error if post.update fails', async () => {
    jest.spyOn(Post, 'findByPk').mockResolvedValue(mockPost as any);
    const mockUpdateError = new Error('Update error');
    mockPost.update.mockRejectedValueOnce(mockUpdateError);
    await expect(Post.updatePostById(1, updatedData)).rejects.toThrow('Update error');
    expect(Post.findByPk).toHaveBeenCalledWith(1);
    expect(mockPost.update).toHaveBeenCalledWith(updatedData);
  });
});
