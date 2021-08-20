import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost, sortedPost, getPostDetail } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost)
router.get('/searchPosts', sortedPost);
router.get('/getDetail', getPostDetail);

export default router;
