import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConsultarTurnosAsignadosHospitalDTO {
  @IsNumber()
  @IsNotEmpty()
  idHospital: number;

  @IsString()
  @IsNotEmpty()
  nombreHospital: string;
}
