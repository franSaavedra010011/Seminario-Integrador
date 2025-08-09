import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  nombreMedico: string;
  
  @IsString()
  apellidoMedico: string;

  @IsString()
  dniMedico: string;

  @IsString()
  telefonoMedico: string;

  @IsString()
  matriculaMedico: string;

  @IsNumber()
  tiempoConsultaMedico: number;
  
  @IsInt()
  @Type(() => Number)
  idHospital: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  especialidades: number[];
}
