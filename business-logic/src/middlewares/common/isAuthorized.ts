import { expressjwt } from "express-jwt";

const isAuthorized = expressjwt({
  secret: process.env.JWT_SECRET || 'secret',
  algorithms: ['HS256'],
});

export default isAuthorized;