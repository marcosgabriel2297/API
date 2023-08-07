import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../../models/User';

const filterByEmail = async (req: CustomRequest, _res: Response, next: NextFunction) => {
    const emailToFind = req.query.email;

    if(!emailToFind) return next();

    req.filter = {
        ...req.filter,
        email: String(emailToFind),
    };
    return next();
};

export default filterByEmail;
