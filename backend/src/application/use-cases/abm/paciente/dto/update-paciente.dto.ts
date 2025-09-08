import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';

export class UpdatePacienteDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  nombrePaciente?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  apellidoPaciente?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  edadPaciente?: number;

  @IsDateString()
  @IsOptional()
  fechaNacimientoPaciente?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  celularPaciente?: string;

  @IsEmail()
  @IsOptional()
  correoPaciente?: string;

  @IsString()
  @IsOptional()
  grupoSanguineoPaciente?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  idLocalidad?: number;
}
