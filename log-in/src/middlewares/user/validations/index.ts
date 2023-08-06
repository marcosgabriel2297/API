import runValidations from '../../common/runValidations';
import validateEmail from './validateEmail';
import validatePassword from './validatePassword';
import validateUniqueEmail from './validateUniqueEmail';

const authValidationsMiddlewares = [validateEmail, validatePassword]
const registerValidations = runValidations([...authValidationsMiddlewares, validateUniqueEmail]);
const authValidations = runValidations(authValidationsMiddlewares);

const middlewares = { registerValidations, authValidations };

export default middlewares;
