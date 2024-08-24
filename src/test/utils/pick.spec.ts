import { pick } from '../../utils/pick';

describe('pick', () => {
  it('should pick the specified properties from an object', () => {
    const object = { first_name: 'Nelofar', last_name: 'Zabi', age: 24 };
    const keys = ['first_name', 'age'];
    
    const result = pick(object, keys);
    
    expect(result).toEqual({ first_name: 'Nelofar', age: 24 });
  });

  it('should return an empty object if no keys match', () => {
    const object = { first_name: 'Nelofar', last_name: 'Zabi', age: 24 };
    const keys = ['non_existent_key'];
    
    const result = pick(object, keys);
    
    expect(result).toEqual({});
  });

  it('should ignore keys that do not exist in the object', () => {
    const object = { first_name: 'Nelofar', last_name: 'Zabi', age: 24 };
    const keys = ['first_name', 'non_existent_key'];
    
    const result = pick(object, keys);
    
    expect(result).toEqual({ first_name: 'Nelofar' });
  });

  it('should return an empty object if the input object is null or undefined', () => {
    const keys = ['first_name'];
    
    expect(pick(null, keys)).toEqual({});
    expect(pick(undefined, keys)).toEqual({});
  });
});
