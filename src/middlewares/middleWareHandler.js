import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { verifyToken } from './verifyToken.js';

const Logger = morgan('dev');

const Cors = cors({
  origin: 'http://localhost:3000',
});

const BParser = bodyParser.json();

export const middleWares = [BParser, Cors, Logger, verifyToken];
