import express from 'express';

import userMiddlewares from '../middlewares/user/validations';
import registerUser from '../middlewares/user/registerUser';
import authUser from '../middlewares/user/authUser';

const authRouter = express.Router();

const { registerValidations, authValidations } = userMiddlewares;

authRouter.post('/register', registerValidations, registerUser);
authRouter.post('/', authValidations, authUser);

export default authRouter;