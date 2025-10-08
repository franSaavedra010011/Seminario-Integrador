import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ConsultarTurnosHistorialDTO {
  @IsDate()
  @IsNotEmpty()
  fechaTurno: Date;

  @IsDate()
  @IsNotEmpty()
  fechaBajaTurno: Date;

  @IsBoolean()
  @IsNotEmpty()
  presentismo: boolean;

  @IsString()
  @IsNotEmpty()
  observaciones: string;

  @IsString()
  @IsNotEmpty()
  nombreHospital: string;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;

  @IsString()
  @IsNotEmpty()
  nombreMedico: string;

  @IsString()
  @IsNotEmpty()
  apellidoMedico: string;
}
