import { check } from 'express-validator';
import { MIN_PASSWORD_LENGTH } from '../../../models/User';
import errorCodes from '../../../constants/errorCodes';

const { PASSWORD_NOT_VALID, PASSWORD_INVALID_LENGTH } = errorCodes;

const validatePassword = check('password', PASSWORD_NOT_VALID)
  .isString()
  .isLength({ min: MIN_PASSWORD_LENGTH })
  .withMessage(`${PASSWORD_INVALID_LENGTH}`);

export default validatePassword;
