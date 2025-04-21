import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/test', (req, res) => {
    console.log("Test route hit");
    res.status(200).json({ message: 'API is working correctly!' });
});
router.get('/allposts', postController.getPosts);
router.get('/getfriendsposts/:id', postController.getFriendsPosts);
router.get('/getuserposts/:id', postController.getUserPosts);
router.get('/searchposts/:param', postController.searchPosts);
router.get('/comments/:id', postController.getComments);
router.post('/addcomment', postController.addComment);


export default router;