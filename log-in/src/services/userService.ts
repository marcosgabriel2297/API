import axios from 'axios';

import ERROR_CODES from '../constants/errorCodes';
import User, { IUser, UserInterface } from '../models/User';
import { comparePassword } from '../utils/bycriptUtil';
import { signJwt } from '../utils/jwtUtil';
import { buildAuthorizationHeader } from '../utils/headersUtil';

const { USER_NOT_EXISTS, PASSWORD_NOT_VALID } = ERROR_CODES;

const { SERVICE_USER_URL } = process.env;

const instance = axios.create({
  baseURL: SERVICE_USER_URL,
});

interface pagination {
  page?: number,
  limit?: number
}

const USERS_EP = '/users';

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

const getUsers = async (pagination: pagination, token: string, email?: string, ) => {
  const params = {
    ...email && { email },
    ...Object.keys(pagination).length && { pagination }
  }

  try {
    const options = {
      ...buildAuthorizationHeader(token),
      params
    }
    const { data } = await instance.get(USERS_EP, options);
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error);
  }
}

const userService = { create, findByEmail, authenticateEmail, getUsers };

export default userService;
