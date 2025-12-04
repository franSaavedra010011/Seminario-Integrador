import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DiasNotificarCancelacionDTO } from './dias-notificar-cancelacion.dto';

export class AgendasNotificarCancelacionDTO {
  @IsNumber()
  @IsNotEmpty()
  nroSemana: number;

  @IsDate()
  @IsNotEmpty()
  fechaDesde: Date;

  @IsDate()
  @IsNotEmpty()
  fechaHasta: Date;

  @IsNotEmpty()
  dias: DiasNotificarCancelacionDTO[];
}
