import { UserEntity } from '../entities/User';

export default interface IUser {
  id?: number;
  name: string;
  email: string;
}
