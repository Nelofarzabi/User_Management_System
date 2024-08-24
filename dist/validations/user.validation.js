"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const addUser = {
    body: joi_1.default.object().keys({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        email: joi_1.default.string().optional().email(),
        password: joi_1.default.string().optional()
    })
};
const updateUser = {
    body: joi_1.default.object().keys({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        email: joi_1.default.string().optional().email(),
        password: joi_1.default.string().optional()
    })
};
exports.userValidations = {
    addUser,
    updateUser
};
//# sourceMappingURL=user.validation.js.map