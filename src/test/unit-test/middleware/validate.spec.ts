// src/test/middleware/validate.spec.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import validate from '../../../middlewares/validate'; 
import { pick } from '../../../utils/pick';

jest.mock('joi', () => {
  const actualJoi = jest.requireActual('joi');
  return {
    ...actualJoi,
    compile: jest.fn(),
  };
});

jest.mock('../../../utils/pick', () => ({
  pick: jest.fn(),
}));

describe('validate middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();
  });

  it('should call next if the request data is valid', () => {
    const schema = {
      body: Joi.object({
        name: Joi.string().required(),
      }),
    };

    const validData = { name: 'Nelofar Zabi' };

    (pick as jest.Mock).mockImplementation((object, keys) => {
      return keys.reduce((acc: { [x: string]: any }, key: string | number) => {
        acc[key] = object[key];
        return acc;
      }, {} as any);
    });

    (Joi.compile as jest.Mock).mockReturnValue({
      prefs: jest.fn().mockReturnThis(),
      validate: jest.fn().mockReturnValue({ value: validData, error: null }),
    });

    req.body = validData;

    const middleware = validate(schema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith();
    expect(req.body).toEqual(validData);
  });

  it('should call next with an error if the request data is invalid', () => {
    const schema = {
      body: Joi.object({
        name: Joi.string().required(),
      }),
    };

    const invalidData = { name: '' };
    const error = {
      details: [{ message: 'name is required' }],
    };

    (pick as jest.Mock).mockImplementation((object, keys) => {
      return keys.reduce((acc: { [x: string]: any }, key: string | number) => {
        acc[key] = object[key];
        return acc;
      }, {} as any);
    });

    (Joi.compile as jest.Mock).mockReturnValue({
      prefs: jest.fn().mockReturnThis(),
      validate: jest.fn().mockReturnValue({ value: invalidData, error }),
    });

    req.body = invalidData;

    const middleware = validate(schema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('name is required'));
  });
});
