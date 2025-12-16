import { IsNotEmpty, IsString } from 'class-validator';
import { GenerarReporteAdministrativo2doPasoCantidades } from './generar-reporte-administrativo-2dopaso-cantidades.dto';

export class GenerarReporteAdministrativoConteoEspecialidad {
  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: String;

  @IsNotEmpty()
  cantidad: number;
}
