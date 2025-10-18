import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsArray,
  ArrayMinSize,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreatePacienteDto } from '../../paciente/dto/create-paciente.dto';
import { CreateMedicoDto } from '../../medico/dto/create-medico.dto';

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

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePacienteDto)
  datosPaciente?: CreatePacienteDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMedicoDto)
  datosMedico?: CreateMedicoDto;

  @IsOptional()
  @Type(() => Number)
  idHospital?: number;
}
