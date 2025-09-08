import { IsNumber, IsOptional, IsString, MinLength, IsArray } from 'class-validator';

export class UpdateMedicoDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  nombreMedico?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  apellidoMedico?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  dniMedico?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  telefonoMedico?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  matriculaMedico?: string;

  @IsNumber()
  @IsOptional()
  tiempoConsultaMedico?: number;

  @IsNumber()
  @IsOptional()
  idHospital?: number;

  @IsArray()
  @IsOptional()
  especialidades?: number[];
}
