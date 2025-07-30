import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

export class RegisterDTO {

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  usernameUsuario: string;

  @Transform(({ value }) => value.trim())
  @IsEmail()
  emailUsuario: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  passwordUsuario: string;

  @Transform(({ value }) => value.trim())
  @IsEnum(Role, { message: 'El rol debe ser uno de: usuario, admin o medico' })
  rol: Role;
}
