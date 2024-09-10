"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const post_validation_1 = require("../validations/post.validation");
const router = (0, express_1.Router)();
router.post('/add-post', (0, validate_1.default)(post_validation_1.postValidations.addPost), postController_1.default.addPost);
router.put('/update-post/:id', (0, validate_1.default)(post_validation_1.postValidations.updatePost), postController_1.default.updatePost);
router.delete('/delete-post/:id', postController_1.default.deletePost);
router.get('/get-posts', postController_1.default.getAllPosts);
router.get('/get-post/:id', postController_1.default.getPostById);
exports.default = router;
//# sourceMappingURL=post.routes.js.map