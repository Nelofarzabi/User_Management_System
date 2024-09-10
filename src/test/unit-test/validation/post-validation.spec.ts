import { postValidations } from '../../../validations/post.validation'; 

describe('Post Validation', () => {
  describe('addPost Validation', () => {
    it('should pass when required fields are provided', () => {
      const req = {
        body: {
          title: 'Sample Post Title',
          content: 'This is the content of the post.',
          userId: 1
        }
      };

      const { error } = postValidations.addPost.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should fail when required fields are missing', () => {
      const req = {
        body: {
          content: 'This is the content of the post.',
          userId: 1
        }
      };

      const { error } = postValidations.addPost.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"title" is required');
    });

    it('should fail when title is not a string', () => {
      const req = {
        body: {
          title: 12345,
          content: 'This is the content of the post.',
          userId: 1
        }
      };

      const { error } = postValidations.addPost.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"title" must be a string');
    });

    it('should fail when userId is not a number', () => {
      const req = {
        body: {
          title: 'Sample Post Title',
          content: 'This is the content of the post.',
          userId: 'not-a-number'
        }
      };

      const { error } = postValidations.addPost.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"userId" must be a number');
    });
  });

  describe('updatePost Validation', () => {
    it('should pass when optional fields are provided', () => {
      const req = {
        body: {
          title: 'Updated Post Title',
          content: 'This is the updated content of the post.'
        }
      };

      const { error } = postValidations.updatePost.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should pass when no fields are provided', () => {
      const req = {
        body: {}
      };

      const { error } = postValidations.updatePost.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should fail when title is not a string', () => {
      const req = {
        body: {
          title: 12345
        }
      };

      const { error } = postValidations.updatePost.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"title" must be a string');
    });

    it('should fail when content is not a string', () => {
      const req = {
        body: {
          content: 67890
        }
      };

      const { error } = postValidations.updatePost.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"content" must be a string');
    });
  });
});
