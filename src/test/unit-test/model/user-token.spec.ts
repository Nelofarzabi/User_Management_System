import { Sequelize } from 'sequelize-typescript';
import { User } from '../../../models/User';
import { UserRole } from '../../../models/UserRole'; 
import { Role } from '../../../models/Role'; 
import { RolePermission } from '../../../models/RolePermission'; 
import { generateToken } from '../../../services/jwtservices'; 
import { Permission } from '../../../models/Permission';
import { Post } from '../../../models/Post';
import { Comment } from '../../../models/Comment';

jest.mock('../../../services/jwtservices'); 

describe('User Model - generateAuthToken', () => {
  let sequelize: Sequelize;
  let user: User;
  const mockToken = 'mocked_token';

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User, UserRole, Role, RolePermission , Permission, Post , Comment], 
    });

    await sequelize.sync();
  });

  beforeEach(() => {
    user = new User({ id: 1 });
    (generateToken as jest.Mock).mockReturnValue(mockToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    if (sequelize) {
      await sequelize.close(); 
    }
  });

  it('should successfully generate an auth token', async () => {
    const token = await user.generateAuthToken();
    
    expect(generateToken).toHaveBeenCalledWith(user.id);
    expect(token).toBe(mockToken);
  });
});
