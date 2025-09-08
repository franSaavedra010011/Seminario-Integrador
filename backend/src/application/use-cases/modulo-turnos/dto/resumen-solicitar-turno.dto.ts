import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class ResumenSolicitarTurnoDTO {
  @IsString()
  @IsNotEmpty()
  nombreHospital: string;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: String;

  @IsString()
  @IsNotEmpty()
  nombreMedico: String;

  @IsString()
  @IsNotEmpty()
  apellidoMedico: String;

  @IsString()
  @IsNotEmpty()
  nombrePaciente: String;

  @IsString()
  @IsNotEmpty()
  apellidoPaciente: String;

  @IsDate()
  @IsNotEmpty()
  fechaHoraActual: Date;

  @IsDate()
  @IsNotEmpty()
  fechaTurno: Date;
}
