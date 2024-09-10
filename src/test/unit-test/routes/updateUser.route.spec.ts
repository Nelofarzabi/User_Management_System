import request from 'supertest';
import express from 'express';
import userController from '../../../controllers/userController'; 
import validate from '../../../middlewares/validate'; 
import { userValidations } from '../../../validations/user.validation';

jest.mock('../../../controllers/userController', () => ({
  updateUser: jest.fn(),
}));

jest.mock('../../../middlewares/validate', () => ({
  __esModule: true,
  default: jest.fn(() => (req: any, res: any, next: () => void) => {
    if (req.body.email && req.body.email === 'invalid-email') {
      return res.status(400).json({ errors: 'Invalid email format' });
    }
    next();
  }),
}));

const app = express();
app.use(express.json());
app.put('/update/:id', validate(userValidations.updateUser), userController.updateUser);

describe('PUT /update/:id', () => {
  it('should update user successfully and return a success message', async () => {
    (userController.updateUser as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ message: "User updated successfully", user: req.body });
    });

    const response = await request(app)
      .put('/update/1')
      .send({ first_name: 'Nelofar', last_name: 'Zabi', email: 'nelofar@gmail.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "User updated successfully",
      user: { first_name: 'Nelofar', last_name: 'Zabi', email: 'nelofar@gmail.com' }
    });
  });

  it('should return 404 if user is not found', async () => {
    (userController.updateUser as jest.Mock).mockImplementation((req, res) => {
      res.status(404).json({ message: "User not found" });
    });

    const response = await request(app)
      .put('/update/999')
      .send({ first_name: 'Nelofar', last_name: 'Zabi', email: 'nelofar@gmail.com' });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  it('should return 400 for validation errors', async () => {
    const response = await request(app)
      .put('/update/1')
      .send({ email: 'invalid-email' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should handle server errors', async () => {
    (userController.updateUser as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app)
      .put('/update/1')
      .send({ first_name: 'Nelofar', last_name: 'Zabi', email: 'nelofar@gmail.com' });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
