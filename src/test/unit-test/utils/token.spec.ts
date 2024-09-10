import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '../../../services/jwtservices';

process.env.JWT_SECRET = 'testsecret';
process.env.JWT_EXPIRES_IN = '1h';

describe('Token Utils', () => {
  const userId = 1;

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(userId);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
     
      
      expect(decoded).toHaveProperty('id', userId);
    });

    it('should include an expiration time', () => {
      const token = generateToken(userId);
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      
      expect(decoded.exp).toBeDefined();
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', () => {
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      
      expect(decoded).toHaveProperty('id', userId);
    });

    it('should throw an error for an invalid token', () => {
      const invalidToken = 'invalid.token.here';
      
      expect(() => verifyToken(invalidToken)).toThrow(jwt.JsonWebTokenError);
    });

    it('should throw an error for an expired token', () => {
      const expiredToken = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '-1s' });
      
      expect(() => verifyToken(expiredToken)).toThrow(jwt.TokenExpiredError);
    });
  });
});
