import User, { UserInterface } from '../models/User';

const findByEmail = (email: string) => User.findOne({ email });

const create = (user: UserInterface) => User.create(user);

const userService = { create, findByEmail };

export default userService;
