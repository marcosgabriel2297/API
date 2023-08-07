import 'dotenv/config';
import express from 'express';
import apiRouter from './router';
import errorHandler from './middlewares/common/errorHandler';

const server = express();

server.use(express.json({}));
server.use(express.urlencoded({ limit: '50mb', extended: false }));

server.use(errorHandler);
server.use('/api', apiRouter);
server.use(errorHandler);

export default server;