import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, MinLength, Min } from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  @MinLength(3)
  nombreHospital: string;

  @IsString()
  @MinLength(5)
  direccionHospital: string;

  @IsOptional()
  @IsEmail()
  emailHospital?: string;

  @IsOptional()
  @IsString()
  telHospital?: string;

  @MinLength(1)
  @Type(() => Number)
  idLocalidad?: number;

  @IsOptional()
  @Type(() => Number)
  idEspecialidadMedica?: number;
}
