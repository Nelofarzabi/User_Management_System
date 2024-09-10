import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { User } from '../../../models';

jest.mock('../../../models', () => ({
  User: {
    scope: jest.fn().mockReturnThis(),
    findAll: jest.fn(),
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

    req = {};

    res = {
      status: statusMock,
    };
  });

  describe('getUsersWithRoles', () => {
    it('should retrieve users with roles successfully', async () => {
      const mockUsersWithRoles = [{ id: 1, name: 'Nelofar Zabi', roles: ['admin'] }];
      (User.scope as jest.Mock).mockReturnValue({ findAll: jest.fn().mockResolvedValue(mockUsersWithRoles) });

      await userController.getUsersWithRoles(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith(mockUsersWithRoles); 
    });

    it('should handle server error', async () => {
      (User.scope as jest.Mock).mockReturnValue({ findAll: jest.fn().mockRejectedValue(new Error('Database error')) });

      await userController.getUsersWithRoles(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('Server Error'); 
    });
  });
});
