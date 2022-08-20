import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { expressjwt } from 'express-jwt';

const Logger = morgan('dev');

const Cors = cors({
  origin: 'http://localhost:3000',
});

const BParser = bodyParser.urlencoded({
  extended: true,
});

const JWT = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS512'],
}).unless({
  path: ['/api/v1/login', '/api/v1/register'],
});

export const middleWares = [BParser, Cors, Logger, JWT];
