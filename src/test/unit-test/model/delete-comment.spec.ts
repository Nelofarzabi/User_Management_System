import { Comment } from '../../../models/Comment';

describe('Comment Model - deleteCommentById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a comment by ID and return true', async () => {
    const mockComment = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(Comment, 'findByPk').mockResolvedValue(mockComment as any);

    const result = await Comment.deleteCommentById(1);

    expect(Comment.findByPk).toHaveBeenCalledWith(1);
    expect(mockComment.destroy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return false if no comment is found by ID', async () => {
    jest.spyOn(Comment, 'findByPk').mockResolvedValue(null);

    const result = await Comment.deleteCommentById(1);

    expect(Comment.findByPk).toHaveBeenCalledWith(1);
    expect(result).toBe(false);
  });

  it('should throw an error if findByPk or destroy fails', async () => {
    const mockError = new Error('Database error');
    
    // Test when findByPk fails
    jest.spyOn(Comment, 'findByPk').mockRejectedValue(mockError);
    await expect(Comment.deleteCommentById(1)).rejects.toThrow('Database error');

    // Test when destroy fails
    jest.spyOn(Comment, 'findByPk').mockResolvedValue({
      id: 1,
      destroy: jest.fn().mockRejectedValue(mockError),
    } as any);

    await expect(Comment.deleteCommentById(1)).rejects.toThrow('Database error');
  });
});
