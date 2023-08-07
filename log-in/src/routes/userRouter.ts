import express from 'express';

const userRouter = express.Router();

// const { registerValidations, authValidations } = userMiddlewares;

userRouter.get('/', (_req, res) => res.json('todo ok'));

export default userRouter;