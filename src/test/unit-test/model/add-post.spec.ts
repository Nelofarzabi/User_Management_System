import { Post } from '../../../models/Post'; 
import { ICreatePost } from '../../../interfaces/post.interface'; 

describe('Post Model - createPost', () => {
  const mockPostData: ICreatePost = {
    title: 'Test Post',
    content: 'This is a test post.',
    userId: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new post successfully', async () => {
    jest.spyOn(Post, 'create').mockResolvedValue(mockPostData as any);

    const result = await Post.createPost(mockPostData);
    expect(Post.create).toHaveBeenCalledWith(mockPostData);
    expect(result).toEqual(mockPostData);
  });

  it('should throw an error if Post.create fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(Post, 'create').mockRejectedValue(mockError);

    await expect(Post.createPost(mockPostData)).rejects.toThrow('Database error');
    expect(Post.create).toHaveBeenCalledWith(mockPostData);
  });
});
