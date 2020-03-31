import { TRoutesInput } from './../types/routes';
import userRouter from './user.router';

export default ({ app }: TRoutesInput) => {
  app.use('/users', userRouter)
}
