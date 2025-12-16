import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GenerarReportePacienteTurnos } from './generar-reporte-paciente-turnos.dto';

export class GenerarReportePaciente {
  @IsNumber()
  @IsNotEmpty()
  turnosAtendidos: number;

  @IsNumber()
  @IsNotEmpty()
  turnosReservados: number;

  @IsNumber()
  @IsNotEmpty()
  turnosAusentes: number;

  @IsNotEmpty()
  turnos: GenerarReportePacienteTurnos[];
}
