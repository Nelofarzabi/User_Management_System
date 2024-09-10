import { User } from '../../../models/User'

describe('User Model - deleteUserById', () => {
  beforeEach(() => {
    jest.spyOn(User, 'findByPk').mockImplementation(async (id: number | string | bigint | Buffer) => {
      if (typeof id === 'number' || typeof id === 'string' || typeof id === 'bigint') {
        if (id === 1) {
          return {
            id: 1,
            email: 'nelofar@gmail.com',
            destroy: jest.fn().mockResolvedValue(true),
          } as unknown as User;
        } else {
          return null;
        }
      }
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete the user if found by ID', async () => {
    const result = await User.deleteUserById(1);

    expect(User.findByPk).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  it('should return false if no user is found by ID', async () => {
    const result = await User.deleteUserById(2);

    expect(User.findByPk).toHaveBeenCalledWith(2);
    expect(result).toBe(false);
  });

  it('should throw an error if findByPk throws an error', async () => {
    jest.spyOn(User, 'findByPk').mockRejectedValue(new Error('Database error'));
    await expect(User.deleteUserById(1)).rejects.toThrow('Database error');
  });
});
