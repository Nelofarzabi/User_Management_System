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
const models_1 = require("../models");
class CommentController {
    constructor() {
        // Create a new comment on a post
        this.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, userId, postId, parentId } = req.body;
                const comment = yield models_1.Comment.create({ content, userId, postId, parentId });
                res.status(201).json({ message: 'Comment added successfully', comment });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        // Update a comment
        this.updateComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { content } = req.body;
                const comment = yield models_1.Comment.findByPk(id);
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                yield comment.update({ content });
                res.status(200).json({ message: 'Comment updated successfully', comment });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        this.getAllComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield models_1.Comment.findAll({
                    include: [
                        { model: models_1.User, attributes: ['id', 'first_name', 'last_name'] },
                        { model: models_1.Post, attributes: ['id', 'title'] },
                        { model: models_1.Comment, as: 'replies' } // Include replies if any
                    ]
                });
                res.status(200).json(comments);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        this.getCommentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comment = yield models_1.Comment.findByPk(id, {
                    include: [
                        { model: models_1.User, attributes: ['id', 'first_name', 'last_name'] },
                        { model: models_1.Post, attributes: ['id', 'title'] },
                        { model: models_1.Comment, as: 'replies' } // Include replies if any
                    ]
                });
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                res.status(200).json(comment);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        // Delete a comment
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comment = yield models_1.Comment.findByPk(id);
                if (!comment) {
                    return res.status(404).json({ message: 'Comment not found' });
                }
                yield comment.destroy();
                res.status(200).json({ message: 'Comment deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
    }
}
const commentController = new CommentController();
exports.default = commentController;
//# sourceMappingURL=commentController.js.map