import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import apiRouter from './router';
import errorHandler from './middlewares/common/errorHandler';

const server = express();

const { LOGIN_BASE_URL } = process.env;

const allowedOrigins = [LOGIN_BASE_URL];

const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin || '')) return next();

  return res.status(403).json({ error: 'Access denied' });
};

server.use(checkOrigin);
server.use(express.json({}));
server.use(express.urlencoded({ limit: '50mb', extended: false }));

server.use(errorHandler);
server.use('/api', apiRouter);
server.use(errorHandler);

export default server;