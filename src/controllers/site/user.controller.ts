import User, { IUser } from '../../models/User';

interface ICreateUserInput {
  fio: IUser['fio']
  date: IUser['date']
  gender: IUser['gender'];
  position?: IUser['position']
  role?: IUser['role']
}

async function CreateUser(user: ICreateUserInput): Promise<IUser> {
  return User.create({ ...user })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    })
}

async function GetAllUsers(): Promise<IUser[]> {
  const users: IUser[] = await User.find({});
  return users;
}

export default {
  CreateUser,
  GetAllUsers,
}
