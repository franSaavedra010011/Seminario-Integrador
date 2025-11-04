import { IsNotEmpty, IsString } from 'class-validator';
import { GenerarReporteAdministrativo2doPasoCantidades } from './generar-reporte-administrativo-2dopaso-cantidades.dto';

export class GenerarReporteAdministrativo2doPasoMensajeCantidades {
  @IsString()
  @IsNotEmpty()
  mensaje: String;

  @IsNotEmpty()
  dtoCantidades: GenerarReporteAdministrativo2doPasoCantidades[];
}
