"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = __importDefault(require("../controllers/commentController"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const validations_1 = require("../validations");
const router = (0, express_1.Router)();
router.post('/add-comment', (0, validate_1.default)(validations_1.commentValidations.addComment), commentController_1.default.addComment);
router.put('/update-comment/:id', (0, validate_1.default)(validations_1.commentValidations.updateComment), commentController_1.default.updateComment);
router.delete('/delete-comment/:id', commentController_1.default.deleteComment);
router.get('/get-comments', commentController_1.default.getAllComments);
router.get('/get-comment/:id', commentController_1.default.getCommentById);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map