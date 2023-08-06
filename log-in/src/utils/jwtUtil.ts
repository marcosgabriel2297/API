import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const { JWT_SECRET } = process.env;

export const signJwt = (payload: IUser) => {
  const token = jwt.sign(payload.toJSON(), JWT_SECRET || 'secret');
  return token;
};

const jwtUtil = {
  signJwt,
};

export default jwtUtil;
