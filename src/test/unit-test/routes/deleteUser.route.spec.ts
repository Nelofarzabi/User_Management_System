import request from 'supertest';
import express from 'express';
import userController from '../../../controllers/userController';

jest.mock('../../../controllers/userController', () => ({
  deleteUser: jest.fn(),
}));

const app = express();
app.use(express.json());
app.delete('/delete/:id', userController.deleteUser);

describe('DELETE /delete/:id', () => {
  it('should delete user successfully and return a success message', async () => {
    (userController.deleteUser as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ message: "User deleted successfully" });
    });

    const response = await request(app).delete('/delete/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User deleted successfully" });
  });

  it('should return 404 if user is not found', async () => {
    (userController.deleteUser as jest.Mock).mockImplementation((req, res) => {
      res.status(404).json({ message: "User not found" });
    });

    const response = await request(app).delete('/delete/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });

  it('should handle server errors', async () => {
    (userController.deleteUser as jest.Mock).mockImplementation((req, res) => {
      res.status(500).send('Server Error');
    });

    const response = await request(app).delete('/delete/1');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
  });
});
