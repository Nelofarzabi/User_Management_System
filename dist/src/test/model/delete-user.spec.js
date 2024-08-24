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
describe('User Model - deleteUserById', () => {
    beforeEach(() => {
        // Mock the User.findByPk method
        jest.spyOn(User_1.User, 'findByPk').mockImplementation((id) => __awaiter(void 0, void 0, void 0, function* () {
            if (typeof id === 'number' || typeof id === 'string' || typeof id === 'bigint') {
                if (id === 1) {
                    return {
                        id: 1,
                        email: 'test@gmail.com',
                        destroy: jest.fn().mockResolvedValue(true),
                    };
                }
                else {
                    return null;
                }
            }
            return null;
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should delete the user if found by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Act
        const result = yield User_1.User.deleteUserById(1);
        // Assert
        expect(User_1.User.findByPk).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    }));
    it('should return false if no user is found by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        // Act
        const result = yield User_1.User.deleteUserById(2);
        // Assert
        expect(User_1.User.findByPk).toHaveBeenCalledWith(2);
        expect(result).toBe(false);
    }));
    it('should throw an error if findByPk throws an error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        jest.spyOn(User_1.User, 'findByPk').mockRejectedValue(new Error('Database error'));
        // Act & Assert
        yield expect(User_1.User.deleteUserById(1)).rejects.toThrow('Database error');
    }));
});
//# sourceMappingURL=delete-user.spec.js.map