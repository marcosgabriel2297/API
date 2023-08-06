import 'dotenv/config';
import express from 'express';
import apiRouter from './router';

const server = express();

server.use(express.json({}));
server.use(express.urlencoded({ limit: '50mb', extended: false }));

server.use('/api', apiRouter);

export default server;