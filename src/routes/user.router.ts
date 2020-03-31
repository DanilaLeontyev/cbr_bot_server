import UserController from './../controllers/site/user.controller';
import { Request, Response, NextFunction, Router } from 'express';

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserController.CreateUser({
      date: req.body.date,
      fio: req.body.fio,
      gender: req.body.gender,
    })
    res.send(user);
  } catch {
    res.send('error');
  }
}

const get_user = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserController.GetAllUsers();
  res.send(users);
}

const update_user = async (req: Request, res: Response, next: NextFunction) => {
  res.send('update_user');
}

const delete_user = async (req: Request, res: Response, next: NextFunction) => {
  res.send('delete_user');
}

let userRouter = Router();

userRouter.get('/', get_user);
userRouter.post('/create', create_user);
userRouter.post('/update', update_user);
userRouter.post('/delete', delete_user);

export = userRouter
