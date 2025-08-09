import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

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

  // Agrega estos dos
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idRolesAAgregar?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idRolesAEliminar?: number[];
}
