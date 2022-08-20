import express from 'express';
import mongoose from 'mongoose';
import { mongoUri, port } from './config/credentials.js';
import { middleWares } from './middlewares/middleWareHandler.js';

const app = express();

middleWares.forEach(middleware => app.use(middleware));

mongoose.connect(mongoUri, { useNewUrlParser: true }, err => {
  if (err) console.log(err);
  else {
    console.log('Connected to MongoDB');
  }
});

app.listen(port, () => {
  console.log('listening on port 8080');
});
