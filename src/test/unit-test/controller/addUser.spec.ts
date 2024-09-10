import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { User } from '../../../models'; 

jest.mock('../../../models', () => ({
  User: jest.fn().mockImplementation(() => ({
    setPassword: jest.fn(),
    save: jest.fn(),
  })),
}));

describe('addUser', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });
    
    req = {
      body: {
        email: 'nelofar@gmail.com',
        password: 'nelofar123',
        first_name: 'Nelofar',
        last_name: 'Zabi',
      },
    };

    res = {
      status: statusMock,
    };
  });

  it('should register a user successfully', async () => {
    const userMock = {
      setPassword: jest.fn(),
      save: jest.fn().mockResolvedValue({ id: 1, email: 'nelofar@gmail.com' }),
    };

    (User as unknown as jest.Mock).mockImplementation(() => userMock);

    await userController.addUser(req as Request, res as Response);

    expect(userMock.setPassword).toHaveBeenCalledWith('nelofar123');

    expect(userMock.save).toHaveBeenCalled();

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: 'User registered successfully',
      user: { id: 1, email: 'nelofar@gmail.com' },
    });
  });

  it('should handle server error', async () => {
    const userMock = {
      setPassword: jest.fn(),
      save: jest.fn().mockRejectedValue(new Error('Save failed')),
    };

    (User as unknown as jest.Mock).mockImplementation(() => userMock);

    await userController.addUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith('Server Error');
  });
});
