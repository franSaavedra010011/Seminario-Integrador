import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GenerarReportePacienteTurnos {
  @IsString()
  @IsNotEmpty()
  nombreMedico: string;

  @IsString()
  @IsNotEmpty()
  apellidoMedico: string;

  @IsString()
  @IsNotEmpty()
  nombreEstado: String;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;
}
