import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import userService, { pagination } from '../../services/userService';

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const email = _req?.query?.email as string;
    const pagination = _req?.query?.pagination as pagination;

    const users = await userService.findPagedUsers(email, pagination);

    res.status(StatusCodes.OK).send(users);
    return next();
  } catch (err) {
    return next(err);
  }
};

export default getUsers;
