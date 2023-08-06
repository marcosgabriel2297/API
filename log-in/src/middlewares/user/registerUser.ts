import { Request, Response, NextFunction } from 'express';
import userService from '../../services/userService';
import { StatusCodes } from 'http-status-codes';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.create(req.body);
    res.status(StatusCodes.OK).send(user);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default registerUser;
