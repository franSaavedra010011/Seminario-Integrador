import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class TurnosSolicitarTurnoDTO {
  @IsBoolean()
  @IsNotEmpty()
  disponible: boolean;

  @IsString()
  @IsNotEmpty()
  horaDesde: String;

  @IsString()
  @IsNotEmpty()
  horaHasta: String;

  @IsDate()
  @IsNotEmpty()
  fechaBaja: Date | null;

  @IsNumber()
  @IsNotEmpty()
  idTurno: Number;
}
