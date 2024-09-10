"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidations = void 0;
const joi_1 = __importDefault(require("joi"));
const addComment = {
    body: joi_1.default.object().keys({
        content: joi_1.default.string().required(),
        userId: joi_1.default.number().required(), // Assuming userId will be passed in the request body
        postId: joi_1.default.number().required(), // Assuming postId will be passed in the request body
        parentId: joi_1.default.number().optional(), // Optional, in case the comment is a reply
    }),
};
const updateComment = {
    body: joi_1.default.object().keys({
        content: joi_1.default.string().optional(),
    }),
};
const deleteComment = {
    params: joi_1.default.object().keys({
        id: joi_1.default.number().required(), // Assuming comment ID will be passed in the URL params
    }),
};
exports.commentValidations = {
    addComment,
    updateComment,
    deleteComment,
};
//# sourceMappingURL=comment.validation.js.map