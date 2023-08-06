import { check } from 'express-validator';
import userService from '../../../services/userService';
import errorCodes from '../../../constants/errorCodes';

const { EMAIL_NOT_VALID, EMAIL_ALREADY_IN_USE } = errorCodes;

const validateUniqueEmail = check('email', EMAIL_NOT_VALID).custom(
  async (email) => {
    const user = await userService.findByEmail(email);

    if (!user) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(EMAIL_ALREADY_IN_USE));
  },
);

export default validateUniqueEmail;
