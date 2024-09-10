import { userValidations } from "../../../validations/user.validation"; 

describe("User Validations", () => {

  describe("addUser Validation", () => {
    it("should pass when required fields are provided", () => {
      const req = {
        body: {
          first_name: "Nelofar",
          last_name: "Zabi",
          email: "nelofar@gmail.com",
          password: "nelofar123"
        }
      };

      const { error } = userValidations.addUser.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it("should fail when required fields are missing", () => {
      const req = {
        body: {
          last_name: "Zabi",
          email: "nelofar@gmail.com"
        }
      };

      const { error } = userValidations.addUser.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain("first_name");
    });

    it("should fail when email is invalid", () => {
      const req = {
        body: {
          first_name: "Nelofar",
          last_name: "Zabi",
          email: "invalid-email",
          password: "nelofar123"
        }
      };

      const { error } = userValidations.addUser.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain("email");
    });
  });

  describe("updateUser Validation", () => {
    it("should pass when required fields are provided", () => {
      const req = {
        body: {
          first_name: "Nelofar",
          last_name: "Zabi",
          email: "nelofar@gmail.com",
          password: "nelofar123"
        }
      };

      const { error } = userValidations.updateUser.body.validate(req.body);
      expect(error).toBeUndefined();
    });

    it("should fail when required fields are missing", () => {
      const req = {
        body: {
          last_name: "Zabi",
          email: "nelofar@gmail.com"
        }
      };

      const { error } = userValidations.updateUser.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain("first_name");
    });

    it("should fail when email is invalid", () => {
      const req = {
        body: {
          first_name: "Nelofar",
          last_name: "Zabi",
          email: "invalid-email",
          password: "nelofar123"
        }
      };

      const { error } = userValidations.updateUser.body.validate(req.body);
      expect(error).toBeDefined();
      expect(error?.details[0].message).toContain("email");
    });
  });

});
