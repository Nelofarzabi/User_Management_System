import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { User } from '../../../models'; 

jest.mock('../../../models', () => ({
  User: {
    deleteUserById: jest.fn(),
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
      params: {},
    };

    res = {
      status: statusMock,
    };
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      req.params = { id: '1' };
      (User.deleteUserById as jest.Mock).mockResolvedValue(true); 

      await userController.deleteUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith({ message: "User deleted successfully" }); 
    });

    it('should return 404 if the user does not exist', async () => {
      req.params = { id: '1' };
      (User.deleteUserById as jest.Mock).mockResolvedValue(false); 

      await userController.deleteUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404); 
      expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" }); 
    });

    it('should handle server errors', async () => {
      req.params = { id: '1' };
      (User.deleteUserById as jest.Mock).mockRejectedValue(new Error('Database error')); 

      await userController.deleteUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('Server Error'); 
    });
  });
});
