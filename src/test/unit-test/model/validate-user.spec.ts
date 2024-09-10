import bcrypt from 'bcrypt';


class MockUser {
  public password!: string;

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

jest.mock('bcrypt');

describe('User Model - validatePassword', () => {
  it('should return true if the password is valid', async () => {
    const mockUser = new MockUser();
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'hashedPassword123';

    mockUser.password = hashedPassword;
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const isValid = await mockUser.validatePassword(plainPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(isValid).toBe(true);
  });

  it('should return false if the password is invalid', async () => {
    const mockUser = new MockUser();
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'hashedPassword123';

    mockUser.password = hashedPassword;
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const isValid = await mockUser.validatePassword(plainPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(isValid).toBe(false);
  });
});
