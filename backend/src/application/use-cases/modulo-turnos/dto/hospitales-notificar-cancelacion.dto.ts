import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HospitalesNotificarCancelacionDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombreHospital: string;
}
