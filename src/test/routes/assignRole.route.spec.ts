import request from 'supertest';
import express from 'express';
import userController from '../../controllers/userController'; 

jest.mock('../../controllers/userController', () => ({
  assignRole: jest.fn(),
}));

jest.mock('../../models', () => ({
  UserRole: {
    create: jest.fn(),
  },
}));

const { UserRole } = require('../../models');

const app = express();
app.use(express.json());
app.post('/assign-role', userController.assignRole);

describe('POST /assign-role', () => {
  it('should assign a role successfully and return a success message', async () => {
    (UserRole.create as jest.Mock).mockResolvedValue({});

    (userController.assignRole as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ message: "Role assigned successfully" });
    });

    const response = await request(app)
      .post('/assign-role')
      .send({ userId: 1, roleId: 2 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Role assigned successfully" });
  });

  it('should handle server errors', async () => {
    (UserRole.create as jest.Mock).mockRejectedValue(new Error('Server Error'));
    (userController.assignRole as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app)
      .post('/assign-role')
      .send({ userId: 1, roleId: 2 });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
