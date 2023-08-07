import ERROR_CODES from '../../../constants/errorCodes';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
const { PAGINATION_PAGE_INVALID } = ERROR_CODES;

interface CustomRequest extends Request {
    page?: number;
}

const validatePage = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    const pagination = req.query.pagination as { page?: string };

    if(!pagination || !pagination.page) return next()

    if(!validator.isNumeric(pagination.page)) return _res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: PAGINATION_PAGE_INVALID })

    req.page = Number(pagination.page);
    return next();
};

export default validatePage;
