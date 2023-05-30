import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import IUser from '../interfaces/user-interface';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
