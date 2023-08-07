import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema<IUser>({});

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject({ versionKey: false });
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export default model<IUser>("User", userSchema);
