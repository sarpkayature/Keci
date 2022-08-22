import express from 'express';
import mongoose from 'mongoose';
import { mongoUri, port } from './config/credentials.js';
import { middleWares } from './middlewares/middleWareHandler.js';
import { verifyToken } from './middlewares/verifyToken.js';
import {
  privateRoutes,
  publicRoutes,
} from './middlewares/router-bundler.js';

const app = express();

mongoose.connect(mongoUri, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Connected DB Successfully 👍 😍 👍 😍 👍 😍 👍 ');
});

middleWares.forEach(middleware => app.use(middleware));
publicRoutes.forEach(route => app.use('/api/v1', route));
privateRoutes.forEach(route => app.use('/api/v1', verifyToken, route));

app.listen(port, () => {
  console.log(`App listens port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 💩 💥 💩💥  Shutting down...');
  console.log(err.name, err.message);
  mongoose.close(() => {
    process.exit(1);
  });
});
