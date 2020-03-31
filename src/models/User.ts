import { Schema, Document, model } from 'mongoose';

export interface IUser {
  fio: string;
  date: Date;
  gender: 0 | 1;
  position?: string;
  role?: string;
}

export interface UserModel extends IUser, Document {
  fullName(): string;
}

let UserSchema: Schema<UserModel> = new Schema({
  fio: { type: String, required: true, max: 100 },
  date: { type: Date, required: true },
  gender: { type: Boolean, required: true },
  position: { type: String },
  role: { type: String },
})

UserSchema.methods.fullName = () => {
  return 'sdf'
};

export default model<UserModel>('User', UserSchema)

