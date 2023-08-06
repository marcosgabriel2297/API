import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export const MIN_PASSWORD_LENGTH = 8;

export interface UserInterface {
  email: string;
  password: string;
};

export interface IUser extends UserInterface, Document {
  comparePassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});


userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject({ versionKey: false });
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

userSchema.pre<IUser>('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
