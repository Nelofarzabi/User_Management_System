import { commentValidations } from '../../../validations/comment.validation'; 

describe('Comment Validation', () => {
  describe('addComment Validation', () => {
    it('should pass when required fields are provided', () => {
      const req = {
        body: {
          content: 'This is a comment.',
          userId: 1,
          postId: 101,
          parentId: 5
        }
      };

      const { error } = commentValidations.addComment.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should fail when required fields are missing', () => {
      const req = {
        body: {
          content: 'This is a comment.',
          postId: 101
        }
      };

      const { error } = commentValidations.addComment.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"userId" is required');
    });

    it('should fail when content is missing', () => {
      const req = {
        body: {
          userId: 1,
          postId: 101
        }
      };

      const { error } = commentValidations.addComment.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"content" is required');
    });

    it('should fail when userId is not a number', () => {
      const req = {
        body: {
          content: 'This is a comment.',
          userId: 'not-a-number',
          postId: 101
        }
      };

      const { error } = commentValidations.addComment.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"userId" must be a number');
    });

    it('should fail when postId is not a number', () => {
      const req = {
        body: {
          content: 'This is a comment.',
          userId: 1,
          postId: 'not-a-number'
        }
      };

      const { error } = commentValidations.addComment.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"postId" must be a number');
    });
  });

  describe('updateComment Validation', () => {
    it('should pass when content is provided', () => {
      const req = {
        body: {
          content: 'Updated comment content.'
        }
      };

      const { error } = commentValidations.updateComment.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should pass when content is not provided', () => {
      const req = {
        body: {}
      };

      const { error } = commentValidations.updateComment.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it('should fail when content is not a string', () => {
      const req = {
        body: {
          content: 12345
        }
      };

      const { error } = commentValidations.updateComment.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain('"content" must be a string');
    });
  });
});
