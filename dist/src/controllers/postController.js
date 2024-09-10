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
class PostController {
    constructor() {
        // Create a new post
        this.addPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, userId } = req.body;
                const post = yield models_1.Post.create({ title, content, userId });
                res.status(201).json({ message: 'Post created successfully', post });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        // Get all posts
        this.getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield models_1.Post.findAll({ include: [models_1.Comment, models_1.User] });
                res.status(200).json(posts);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Server Error');
            }
        });
        // Get a single post by ID
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield models_1.Post.findByPk(id, { include: [models_1.Comment, models_1.User] });
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                res.status(200).json(post);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Server Error');
            }
        });
        // Update a post
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content } = req.body;
                const post = yield models_1.Post.findByPk(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                yield post.update({ title, content });
                res.status(200).json({ message: 'Post updated successfully', post });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        // Delete a post
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield models_1.Post.findByPk(id);
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                yield post.destroy();
                res.status(200).json({ message: 'Post deleted successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
    }
}
const postController = new PostController();
exports.default = postController;
//# sourceMappingURL=postController.js.map