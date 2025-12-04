import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePacienteDto {
  @IsString()
  nombrePaciente: string;

  @IsString()
  apellidoPaciente: string;

  @IsString()
  dniPaciente: string;

  @IsNumber()
  edadPaciente: number;

  @IsDateString()
  fechaNacimientoPaciente: Date;

  @IsString()
  celularPaciente: string;

  @IsString()
  correoPaciente: string;

  @IsString()
  grupoSanguineoPaciente: string;

  @IsOptional()
  @IsString()
  familiaresACargo?: string;

  @IsOptional()
  @IsString()
  problemasEnCurso?: string;

  @IsOptional()
  @IsString()
  antecedentesHeredofamiliares?: string;

  @IsOptional()
  @IsString()
  habitos?: string;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsOptional()
  vacunas?: any[];

  @IsNumber()
  idLocalidad: number;
}
