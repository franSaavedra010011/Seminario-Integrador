import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  emailUsuario: string;

  @IsString()
  @IsNotEmpty()
  usernameUsuario: string;

  @IsString()
  @IsNotEmpty()
  passwordUsuario: string;

  @IsString()
  rol: string;

  @IsNumber()
  hospitalId?: number;

  // Campos opcionales para médico
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellido?: string;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsNumber()
  tiempoConsulta?: number;

  @IsOptional()
  @IsArray()
  especialidades?: number[];

  // Campos opcionales para paciente
  @IsOptional()
  @IsNumber()
  edad?: number;

  @IsOptional()
  @IsString()
  fechaNacimiento?: string;

  @IsOptional()
  @IsString()
  grupoSanguineo?: string;
}
