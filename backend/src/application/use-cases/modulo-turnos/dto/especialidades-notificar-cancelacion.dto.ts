import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EspecialidadesNotificarCancelacionDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombreEspecialidad: string;
}
