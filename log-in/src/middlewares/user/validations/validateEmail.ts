import { check } from 'express-validator';
import ERROR_CODES from '../../../constants/errorCodes';

const { EMAIL_NOT_VALID } = ERROR_CODES;

const validateEmail = check('email', EMAIL_NOT_VALID).exists().isEmail();

export default validateEmail;
