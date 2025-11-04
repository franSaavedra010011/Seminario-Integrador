import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GenerarReporteMedicoPacientes {
  @IsString()
  @IsNotEmpty()
  nombrePaciente: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaciente: string;

  @IsDate()
  @IsNotEmpty()
  fechaTurno: Date;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;
}
