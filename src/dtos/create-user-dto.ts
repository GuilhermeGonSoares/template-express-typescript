import { Expose } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;
}
