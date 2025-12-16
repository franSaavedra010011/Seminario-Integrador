import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConsultarCantidadTurnosAsignadosTurnosDTO {
  @IsString()
  @IsNotEmpty()
  horaTurno: string;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;

  @IsString()
  @IsNotEmpty()
  nombrePaciente: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaciente: string;
}
