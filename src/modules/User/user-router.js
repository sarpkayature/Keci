import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
} from './user-controller.js';

const userRouter = express.Router();

userRouter
  .delete('/users/:userId', deleteUser)
  .get('/users/:userId', getUser)
  .put('/users/:userId', updateUser)
  .post('/signup', createUser)
  .post('/login', loginUser);

export default userRouter;
