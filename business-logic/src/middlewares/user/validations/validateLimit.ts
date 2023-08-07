import ERROR_CODES from '../../../constants/errorCodes';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
const { PAGINATION_LIMIT_INVALID } = ERROR_CODES;

interface CustomRequest extends Request {
    limit?: number;
}

const validateLimit = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    const pagination = req.query.pagination as { limit?: string };

    if(!pagination || !pagination.limit) return next()

    if(!validator.isNumeric(pagination.limit)) return _res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: PAGINATION_LIMIT_INVALID })

    req.limit = Number(pagination.limit);
    return next();
};

export default validateLimit;
