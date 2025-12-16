import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class GenerarReporteAdministrativo2doPasoCantidades {
  @IsNumber()
  @IsNotEmpty()
  turnosCanceladosCA: number;

  @IsNumber()
  @IsNotEmpty()
  turnosNoAsistidosCA: number;

  @IsNumber()
  @IsNotEmpty()
  turnosAsistidosCA: number;

  @IsNumber()
  @IsNotEmpty()
  turnosEnProceso: number;

  @IsDate()
  @IsNotEmpty()
  fechaCongestion: Date;
}
