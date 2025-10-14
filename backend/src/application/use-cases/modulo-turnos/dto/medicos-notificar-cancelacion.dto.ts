import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MedicosNotificarCancelacionDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombreMedico: string;

  @IsString()
  @IsNotEmpty()
  apellidoMedico: string;
}
