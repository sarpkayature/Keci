import express from 'express';
import { deleteUser, getUser, updateUser } from './user-controller.js';

const userRouter = express.Router();

userRouter
  .delete('/users/:userId', deleteUser)
  .get('/users/:userId', getUser)
  .put('/users/:userId', updateUser);

export default userRouter;
