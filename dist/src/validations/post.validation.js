"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const addPost = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        content: joi_1.default.string().required(),
        userId: joi_1.default.number().required(), // Assuming userId will be passed in the request body
    }),
};
const updatePost = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().optional(),
        content: joi_1.default.string().optional(),
    }),
};
const deletePost = {
    params: joi_1.default.object().keys({
        id: joi_1.default.number().required(), // Assuming post ID will be passed in the URL params
    }),
};
exports.postValidations = {
    addPost,
    updatePost,
    deletePost,
};
//# sourceMappingURL=post.validation.js.map