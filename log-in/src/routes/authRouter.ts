import express from 'express';

import userMiddlewares from '../middlewares/user/validations';
import registerUser from '../middlewares/user/registerUser';

const authRouter = express.Router();

const { registerValidations } = userMiddlewares;

authRouter.post('/register', registerValidations, registerUser)

export default authRouter;