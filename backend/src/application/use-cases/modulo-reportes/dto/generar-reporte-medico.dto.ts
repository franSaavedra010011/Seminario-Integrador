import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GenerarReporteMedicoHospital } from './generar-reporte-medico-hospitales.dto';
import { GenerarReporteMedicoPacientes } from './generar-reporte-medico-pacientes.dto';

export class GenerarReporteMedico {
  @IsNumber()
  @IsNotEmpty()
  turnosAtendidos: number;

  @IsNumber()
  @IsNotEmpty()
  turnosCancelados: number;

  @IsNumber()
  @IsNotEmpty()
  turnosAusentes: number;

  @IsNotEmpty()
  hospitales: GenerarReporteMedicoHospital[];

  @IsNotEmpty()
  pacientes: GenerarReporteMedicoPacientes[];
}
