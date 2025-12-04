import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class EspecialidadSolicitarTurnoDto {
  @IsNotEmpty()
  @IsString()
  nombreEspecialidad: string;

  @IsNotEmpty()
  @IsNumber()
  idEspecialidad: number;
}
