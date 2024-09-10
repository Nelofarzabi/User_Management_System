import request from 'supertest';
import express from 'express';
import userController from '../../../controllers/userController';

jest.mock('../../../controllers/userController', () => ({
  addUser: jest.fn(),
}));

const app = express();
app.use(express.json());
app.post('/add-user', userController.addUser);

describe('POST /add-user', () => {
  it('should create a user successfully and return a 201 status', async () => {
    (userController.addUser as jest.Mock).mockImplementation((req, res) => {
      res.status(201).json({ message: 'User registered successfully', user: { email: 'nelofar@gmail.com' } });
    });

    const response = await request(app)
      .post('/add-user')
      .send({ email: 'nelofar@gmail.com', password: 'nelofar123', first_name: 'Nelofar', last_name: 'Zabi' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User registered successfully', user: { email: 'nelofar@gmail.com' } });
  });

  it('should handle server errors', async () => {
    (userController.addUser as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app)
      .post('/add-user')
      .send({ email: 'nelofar@gmail.com', password: 'nelofar123', first_name: 'Nelofar', last_name: 'Zabi' });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
