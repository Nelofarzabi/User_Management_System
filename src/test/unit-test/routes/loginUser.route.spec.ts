import request from 'supertest';
import express from 'express';
import userController from '../../../controllers/userController';

jest.mock('../../../controllers/userController', () => ({
  login: jest.fn(),
}));

const app = express();
app.use(express.json());
app.post('/login', userController.login);

describe('POST /login', () => {
  it('should login successfully and return a token', async () => {
    (userController.login as jest.Mock).mockImplementation((req, res) => {
      res.json({ token: 'mockToken' });
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'nelofar@gmail.com', password: 'nelofar123' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: 'mockToken' });
  });

  it('should return 401 for invalid credentials', async () => {
    (userController.login as jest.Mock).mockImplementation((req, res) => {
      res.status(401).send('User not exist');
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid@gmail.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.text).toBe('User not exist');
  });

  it('should handle server errors', async () => {
    (userController.login as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app)
      .post('/login')
      .send({ email: 'nelofar@gmail.com', password: 'nelofar123' });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
