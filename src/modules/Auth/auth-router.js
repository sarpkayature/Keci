import express from 'express';
import { createUser, loginUser, refreshToken } from './auth-controller.js';

const authRouter = express.Router();

authRouter
  .post('/signup', createUser)
  .post('/login', loginUser)
  .post('/refresh-token', refreshToken);

export default authRouter;
