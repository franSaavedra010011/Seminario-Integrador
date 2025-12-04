import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class TurnosNotificarCancelacionDTO {
  @IsBoolean()
  @IsNotEmpty()
  disponible: boolean;

  @IsDate()
  @IsNotEmpty()
  horaDesde: String;

  @IsString()
  @IsNotEmpty()
  horaHasta: String;

  @IsNumber()
  @IsNotEmpty()
  idTurno: Number;
}
