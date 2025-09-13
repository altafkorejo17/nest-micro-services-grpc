import { Role } from 'auth/roles.enum';
import {
  IsString,
  IsEmail,
  MinLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  // @IsArray()
  // @ArrayNotEmpty()
  // roles: string[];
}
