import express from 'express';
import getUsers from '../middlewares/user/getUsers';
import filterByEmail from '../middlewares/user/filters/filterByEmail';
import isAuthorized from '../middlewares/common/isAuthorized';

const userRouter = express.Router();

userRouter.get('/', isAuthorized, filterByEmail, getUsers);

export default userRouter;