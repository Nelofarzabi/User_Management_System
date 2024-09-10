import bcrypt from 'bcrypt';

class MockUser {
  public password!: string;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}

jest.mock('bcrypt');

describe('User Model - setPassword', () => {
  it('should hash the password and store it', async () => {
    const mockUser = new MockUser(); 
    const plainPassword = 'plainPassword123';
    const hashedPassword = 'hashedPassword123';

    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    await mockUser.setPassword(plainPassword);

    expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
    expect(mockUser.password).toBe(hashedPassword);
  });
});
