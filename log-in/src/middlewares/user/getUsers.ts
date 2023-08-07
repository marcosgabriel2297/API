import { Response, NextFunction } from 'express';
import userService from '../../services/userService';
import { StatusCodes } from 'http-status-codes';
import { CustomRequest } from '../../models/User';

const getUsers = async (_req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = String(_req?.headers.authorization);
    const users = await userService.getUsers(_req.query, token, _req?.filter?.email);

    res.status(StatusCodes.OK).json(users);
    return next();
  } catch (err) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: err.message });
  }
};

export default getUsers;
