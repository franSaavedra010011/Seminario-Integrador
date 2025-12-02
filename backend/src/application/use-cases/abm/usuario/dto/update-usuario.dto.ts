import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  usernameUsuario?: string;

  @IsOptional()
  @IsEmail()
  emailUsuario?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  passwordUsuario?: string;
}
