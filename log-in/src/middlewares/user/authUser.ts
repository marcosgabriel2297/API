import { Request, Response, NextFunction } from 'express';
import userService from '../../services/userService';
import { StatusCodes } from 'http-status-codes';

const authUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.authenticateEmail(_req.body);
    res.status(StatusCodes.OK).json(user);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default authUser;
