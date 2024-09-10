import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { Role } from '../../../models'; 

jest.mock('../../../models', () => ({
  Role: {
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

  describe('getRolesWithPermissions', () => {
    it('should retrieve roles with permissions successfully', async () => {
      const mockRolesWithPermissions = [{ id: 1, name: 'Admin', permissions: ['read', 'write'] }];
      (Role.scope as jest.Mock).mockReturnValue({ findAll: jest.fn().mockResolvedValue(mockRolesWithPermissions) });

      await userController.getRolesWithPermissions(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith(mockRolesWithPermissions); 
    });

    it('should handle server errors', async () => {
      (Role.scope as jest.Mock).mockReturnValue({ findAll: jest.fn().mockRejectedValue(new Error('Database error')) });

      await userController.getRolesWithPermissions(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('Server Error');
    });
  });
});
