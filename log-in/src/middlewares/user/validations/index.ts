import runValidations from '../../common/runValidations';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateUniqueEmail from './validateUniqueEmail';

const authValidations = [validateEmail, validatePassword]
const registerValidations = runValidations([...authValidations, validateUniqueEmail]);

const middlewares = { registerValidations };

export default middlewares;
