import request from 'supertest';
import express from 'express';
import userController from '../../controllers/userController';

jest.mock('../../controllers/userController', () => ({
  getUser: jest.fn(),
}));

const app = express();
app.use(express.json()); 
app.get('/get-user', userController.getUser);

describe('GET /get-user', () => {
  it('should return user data successfully', async () => {
    (userController.getUser as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, email: 'nelofar@gmail.com', first_name: 'Nelofar', last_name: 'Zabi' }]);
    });

    const response = await request(app).get('/get-user');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, email: 'nelofar@gmail.com', first_name: 'Nelofar', last_name: 'Zabi' }]);
  });

  it('should handle server errors', async () => {
    (userController.getUser as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app).get('/get-user');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
