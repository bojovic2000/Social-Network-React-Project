import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', userController.loginUser)
router.post('/update', userController.updateUser)
router.get('/', userController.getUsers);
router.get('/getuser/:id', userController.getUser);
router.post('/add', userController.addUser);
router.get('/getfriends/:id', userController.getFriends);
router.get('/searchusers/:param', userController.searchUsers);
router.get('/countrequests/:id', userController.countRequests);


export default router;