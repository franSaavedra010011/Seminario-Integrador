import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { RolEnum } from 'src/domain/enums/rol.enum';

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

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  roles: string[];
}
