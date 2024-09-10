import { User } from '../../../models/User'; 

describe('User Model - getAllUser', () => {
  const mockUsers = [
    { id: 1, username: 'Nelofar', email: 'nelofar@gmail.com' },
    { id: 2, username: 'Zuhra', email: 'zuhra@gmail.com' },
  ];

  beforeEach(() => {
    jest.spyOn(User, 'findAll').mockResolvedValue(mockUsers as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const users = await User.getAllUser();

    expect(users).toEqual(mockUsers);
    expect(User.findAll).toHaveBeenCalledTimes(1); 
  });

  it('should throw an error if findAll fails', async () => {
    const mockError = new Error('Database error');
    jest.spyOn(User, 'findAll').mockRejectedValue(mockError);

    await expect(User.getAllUser()).rejects.toThrow(mockError);
    expect(User.findAll).toHaveBeenCalledTimes(1);
  });
});
