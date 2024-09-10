import { User } from '../../../models/User';
import { ICreateUser } from '../../../interfaces/user.interface';

describe('User Model - addUser', () => {
  let mockUserData: ICreateUser;

  beforeEach(() => {
    mockUserData = {
      email: 'nelofar@gmail.com',
      password: 'nelofar123',
      first_name: 'Nelofar',
      last_name: 'Zabi',
    };

    jest.spyOn(User, 'create').mockImplementation(async (userData: any) => {
      return {
        ...userData,
        id: 1,
      } as User;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully add a user', async () => {
    const result = await User.prototype.addUser(mockUserData);

    expect(User.create).toHaveBeenCalledWith(mockUserData);
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('email', mockUserData.email);
  });

  it('should handle errors', async () => {
    jest.spyOn(User, 'create').mockRejectedValue(new Error('Database error'));
    await expect(User.prototype.addUser(mockUserData)).rejects.toThrow('Database error');
  });
});
