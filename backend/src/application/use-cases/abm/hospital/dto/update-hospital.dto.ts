import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, MinLength, IsArray } from 'class-validator';

export class UpdateHospitalDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombreHospital?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  direccionHospital?: string;

  @IsOptional()
  @IsEmail()
  emailHospital?: string;

  @IsOptional()
  @IsString()
  telHospital?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idEspecialidadesAAgregar?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  idEspecialidadesAEliminar?: number[];
}
