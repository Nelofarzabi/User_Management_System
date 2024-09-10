import { Router } from 'express';
import postController from '../controllers/postController';
import validate from "../middlewares/validate";
import { postValidations } from '../validations/post.validation';

const router = Router();

router.post('/add-post', validate(postValidations.addPost), postController.addPost);
router.put('/update-post/:id', validate(postValidations.updatePost), postController.updatePost);
router.delete('/delete-post/:id', postController.deletePost);
router.get('/get-posts', postController.getAllPosts);
router.get('/get-post/:id', postController.getPostById);

export default router;
