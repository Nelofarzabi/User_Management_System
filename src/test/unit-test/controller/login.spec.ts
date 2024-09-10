import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { User } from '../../../models'; 

jest.mock('../../../models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe('UserController', () => {
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
      },
    };

    res = {
      status: statusMock,
    };
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const userMock = {
        validatePassword: jest.fn().mockResolvedValue(true),
        generateAuthToken: jest.fn().mockResolvedValue('mockToken'),
      };

      (User.findOne as jest.Mock).mockResolvedValue(userMock);

      await userController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith({ token: 'mockToken' });
      expect(userMock.validatePassword).toHaveBeenCalledWith('nelofar123');
      expect(userMock.generateAuthToken).toHaveBeenCalled();
    });

    it('should return 401 if user is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await userController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(sendMock).toHaveBeenCalledWith('User not exist');
    });

    it('should return 401 if password is invalid', async () => {
      const userMock = {
        validatePassword: jest.fn().mockResolvedValue(false),
        generateAuthToken: jest.fn(),
      };

      (User.findOne as jest.Mock).mockResolvedValue(userMock);

      await userController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(sendMock).toHaveBeenCalledWith('User not exist');
    });

    it('should handle server errors', async () => {
      (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await userController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Server Error');
    });
  });
});
