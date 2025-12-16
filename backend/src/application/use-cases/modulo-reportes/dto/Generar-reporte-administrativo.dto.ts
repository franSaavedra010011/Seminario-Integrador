import { IsNotEmpty, IsString } from 'class-validator';
import { GenerarReporteAdministrativoConteoEspecialidad } from './generar-reporte-administrativo-conteo-especialidad.dto';
import { GenerarReporteAdministrativo2doPasoMensajeCantidades } from './generar-reporte-administrativo-2dopaso-mensaje-cantidades.dto';

export class GenerarReporteAdministrativo {
  @IsNotEmpty()
  cantidadCongestion: GenerarReporteAdministrativo2doPasoMensajeCantidades;

  @IsNotEmpty()
  cantidadEspecialidad: GenerarReporteAdministrativoConteoEspecialidad[];
}
