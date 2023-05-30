import { Expose } from 'class-transformer';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdatedUserDto {
  @Expose()
  @IsString()
  @IsOptional()
  name: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email: string;
}
