import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  usernameUsuario: string;
  @IsEmail()
  emailUsuario: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  passwordUsuario: string;
  rol: string;
}
