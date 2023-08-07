import { Request, Response, NextFunction } from 'express';

const errors = {
    UNAUTHORIZED: 'UnauthorizedError',
};

interface error {
    name: string
}

const errorHandler = (error: error, _req: Request, res: Response, next: NextFunction) => {
    if (error.name === errors.UNAUTHORIZED) {
      res.status(401).send(error);
      return next();
    }
    res.status(500).send(error);
    return next();
};

export default errorHandler;
