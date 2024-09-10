import { Router } from 'express';
import commentController from '../controllers/commentController';
import validate from "../middlewares/validate";
import { commentValidations } from '../validations';

const router = Router();

router.post('/add-comment', validate(commentValidations.addComment), commentController.addComment);
router.put('/update-comment/:id', validate(commentValidations.updateComment), commentController.updateComment);
router.delete('/delete-comment/:id', commentController.deleteComment);
router.get('/get-comments', commentController.getAllComments);
router.get('/get-comment/:id', commentController.getCommentById);

export default router;
