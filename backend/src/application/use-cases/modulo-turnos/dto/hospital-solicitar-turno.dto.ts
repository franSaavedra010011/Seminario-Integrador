import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HospitalSolicitarTurnoDto {
  @IsNotEmpty()
  @IsNumber()
  idHospital: Number;

  @IsNotEmpty()
  @IsString()
  nombreHospital: String;

  @IsNotEmpty()
  @IsString()
  direccionHospital: String;

  @IsNotEmpty()
  @IsString()
  nivelCongestion: String;
}
