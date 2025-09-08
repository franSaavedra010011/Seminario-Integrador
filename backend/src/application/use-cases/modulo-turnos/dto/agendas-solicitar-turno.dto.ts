import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DiasSolicitarTurnoDTO } from './dias-solicitar-turno.dto';

export class AgendasSolicitarTurnoDTO {
  @IsNumber()
  @IsNotEmpty()
  idSemana: number;

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
  dias: DiasSolicitarTurnoDTO[];
}
