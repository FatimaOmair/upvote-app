import { Router } from "express";
import auth from './../../middleware/auth.middleware.js';
import fileUpload, { fileValidation } from './../../utils/multer.js';
import * as postController from './post.controller.js';
import * as commentController from './comment.controller.js'
import { asyncHandler } from './../../utils/errorHandling.js'; 
const router = Router();
router.get('/posts',asyncHandler(postController.getPosts))
router.post('/', auth, fileUpload(fileValidation.image).single('image'), asyncHandler(postController.createPost));
router.patch('/:id/like', auth, asyncHandler(postController.like));
router.patch('/:id/unlike', auth, asyncHandler(postController.unlike));
router.post('/:id/comment',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(commentController.createComment))

export default router;
