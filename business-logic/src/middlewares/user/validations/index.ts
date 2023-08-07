import validateLimit from './validateLimit';
import validatePage from './validatePage';

const paginationValidations = [validatePage, validateLimit];

const middlewares = {  paginationValidations };

export default middlewares;
