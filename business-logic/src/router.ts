import express from 'express';
import userRouter from './routes/userRouter';

const router = express.Router();

router.use('/users', userRouter);

export default router;
