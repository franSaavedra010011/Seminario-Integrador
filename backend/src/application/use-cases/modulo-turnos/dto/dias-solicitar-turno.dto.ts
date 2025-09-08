import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { TurnosNotificarCancelacionDTO } from './turnos-notificar-cancelacion.dto';

export class DiasSolicitarTurnoDTO {
  @IsString()
  @IsNotEmpty()
  nombreDia: string;

  @IsNumber()
  @IsNotEmpty()
  idDia: number;

  @IsDate()
  @IsNotEmpty()
  fechaHoraBajaAgendaDia: Date | null;

  @IsNotEmpty()
  turnos: TurnosNotificarCancelacionDTO[];
}
