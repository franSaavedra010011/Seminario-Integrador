import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { TurnosNotificarCancelacionDTO } from './turnos-notificar-cancelacion.dto';

export class DiasNotificarCancelacionDTO {
  @IsString()
  @IsNotEmpty()
  nombreDia: string;

  @IsNumber()
  @IsNotEmpty()
  idAgendaDia: Number;

  @IsDate()
  @IsNotEmpty()
  fechaHoraBajaAgendaDia: Date | null;

  @IsNotEmpty()
  turnos: TurnosNotificarCancelacionDTO[];
}
