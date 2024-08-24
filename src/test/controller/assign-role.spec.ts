import { Request, Response } from 'express';
import userController from '../../controllers/userController';
import { UserRole } from '../../models'; 

jest.mock('../../models', () => ({
  UserRole: {
    create: jest.fn(),
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
      body: {},
    };

    res = {
      status: statusMock,
    };
  });

  describe('assignRole', () => {
    it('should assign a role successfully', async () => {
      req.body = { userId: 1, roleId: 2 };
      (UserRole.create as jest.Mock).mockResolvedValue(undefined); 

      await userController.assignRole(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith({ message: "Role assigned successfully" });
    });

    it('should handle server error', async () => {
      req.body = { userId: 1, roleId: 2 };
      (UserRole.create as jest.Mock).mockRejectedValue(new Error('Database error')); 

      await userController.assignRole(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('Server Error'); 
    });
  });
});

