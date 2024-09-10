import { Request, Response } from 'express';
import userController from '../../../controllers/userController';
import { User } from '../../../models';
import { ICreateUser } from '../../../interfaces/user.interface';

jest.mock('../../../models', () => ({
  User: {
    updateUserById: jest.fn(),
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
      body: {},
    };

    res = {
      status: statusMock,
    };
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      req.params = { id: '1' };
      req.body = { first_name: 'Nelofar', last_name: 'Zabi' } as Partial<ICreateUser>;
      const updatedUser = { id: 1, first_name: 'Nelofar', last_name: 'Zabi' };
      (User.updateUserById as jest.Mock).mockResolvedValue(updatedUser); 

      await userController.updateUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200); 
      expect(jsonMock).toHaveBeenCalledWith({ message: "User updated successfully", user: updatedUser }); 
    });

    it('should return 404 if the user does not exist', async () => {
      req.params = { id: '1' };
      req.body = { first_name: 'Nelofar', last_name: 'Zabi' } as Partial<ICreateUser>;
      (User.updateUserById as jest.Mock).mockResolvedValue(null); 

      await userController.updateUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404); 
      expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" }); 
    });

    it('should handle server errors', async () => {
      req.params = { id: '1' };
      req.body = { first_name: 'Nelofar', last_name: 'Zabi' } as Partial<ICreateUser>;
      (User.updateUserById as jest.Mock).mockRejectedValue(new Error('Database error')); 

      await userController.updateUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('Server Error');
    });
  });
});
