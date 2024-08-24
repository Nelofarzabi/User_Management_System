import { Request, Response } from 'express';
import userController from '../../controllers/userController';
import { User } from '../../models'; 

jest.mock('../../models', () => ({
  User: {
    getAllUser: jest.fn(),
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

  describe('getUser', () => {
    it('should retrieve all users and return them', async () => {
      const mockUsers = [
        { id: 1, email: 'nelofar@gmail.com', first_name: 'Nelofar', last_name: 'Zabi' },
        { id: 2, email: 'zuhra@gmail.com', first_name: 'Zuhra', last_name: 'Hashmi' },
      ];

      (User.getAllUser as jest.Mock).mockResolvedValue(mockUsers);

      await userController.getUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle server error', async () => {
      (User.getAllUser as jest.Mock).mockRejectedValue(new Error('Database error'));

      await userController.getUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500); 
      expect(sendMock).toHaveBeenCalledWith('server error'); 
    });
  });
});
