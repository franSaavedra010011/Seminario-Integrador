import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ConsultarTurnosActivosDTO {
  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  nombreMedico: string;

  @IsString()
  @IsNotEmpty()
  apellidoMedico: string;

  @IsString()
  @IsNotEmpty()
  nombreHospital: string;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;
}
