"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
describe('User Model - addUser', () => {
    let mockUserData;
    beforeEach(() => {
        mockUserData = {
            email: 'test@gmail.com',
            password: 'Test123!',
            first_name: 'Test',
            last_name: 'User',
        };
        // Mock the User.create method
        jest.spyOn(User_1.User, 'create').mockImplementation((userData) => __awaiter(void 0, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, userData), { id: 1 });
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should successfully add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Act
        const result = yield User_1.User.prototype.addUser(mockUserData);
        // Assert
        expect(User_1.User.create).toHaveBeenCalledWith(mockUserData);
        expect(result).toHaveProperty('id', 1);
        expect(result).toHaveProperty('email', mockUserData.email);
    }));
    it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        jest.spyOn(User_1.User, 'create').mockRejectedValue(new Error('Database error'));
        // Act & Assert
        yield expect(User_1.User.prototype.addUser(mockUserData)).rejects.toThrow('Database error');
    }));
});
//# sourceMappingURL=add-user.spec.js.map