import express from 'express';
import getUsers from '../middlewares/user/getUsers';
import validations from '../middlewares/user/validations';
import isAuthorized from '../middlewares/common/isAuthorized';

const { paginationValidations } = validations;
const userRouter = express.Router();

userRouter.get('/', isAuthorized, paginationValidations, getUsers);

export default userRouter;