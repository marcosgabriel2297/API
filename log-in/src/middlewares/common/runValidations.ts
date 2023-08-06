import { validationResult, ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const runValidations = (validations: Array<ValidationChain>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
};

export default runValidations;
