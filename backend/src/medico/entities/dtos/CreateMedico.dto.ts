import { IsNumber, IsString } from 'class-validator';

export class MedicoDTO {
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
  @IsNumber()
  idHospital: number;
  especialidades: number[];
}
