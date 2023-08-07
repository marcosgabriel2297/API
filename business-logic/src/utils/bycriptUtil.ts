import bcrypt from 'bcrypt';

export const comparePassword = (password: string, encriptedPassword: string) => bcrypt.compare(password, encriptedPassword);