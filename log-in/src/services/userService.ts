import ERROR_CODES from '../constants/errorCodes';
import User, { IUser, UserInterface } from '../models/User';
import { comparePassword } from '../utils/bycriptUtil';
import { signJwt } from '../utils/jwtUtil';

const { USER_NOT_EXISTS, PASSWORD_NOT_VALID } = ERROR_CODES;

const findByEmail = (email: string) => User.findOne({ email });

const create = (user: UserInterface) => User.create(user);

const signUserWithJwt = (user: IUser) => {
    const token = signJwt(user);
    return { ...user.toJSON(), ...{ token } };
};

const authenticateEmail = async (credentials: UserInterface) => {
    const user = await findByEmail(credentials.email);
    if (!user) return Promise.reject({ message: USER_NOT_EXISTS });

    const isPasswordValid = await comparePassword(credentials.password, user.password);
    if (!isPasswordValid) {
      return Promise.reject({ message: PASSWORD_NOT_VALID });
    }

    return signUserWithJwt(user);
  };

const userService = { create, findByEmail, authenticateEmail };

export default userService;
