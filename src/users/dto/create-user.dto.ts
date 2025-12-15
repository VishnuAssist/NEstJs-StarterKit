import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../roles.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
