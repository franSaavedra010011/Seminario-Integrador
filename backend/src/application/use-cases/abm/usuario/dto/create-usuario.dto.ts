import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray, ArrayMinSize, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsuarioDto {
  @IsEmail()
  emailUsuario: string;

  @IsString()
  @IsNotEmpty()
  usernameUsuario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  passwordUsuario: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  idRoles: number[];
}
