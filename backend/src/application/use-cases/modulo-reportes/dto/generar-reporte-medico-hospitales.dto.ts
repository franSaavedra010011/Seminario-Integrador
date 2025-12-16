import { IsNotEmpty, IsString } from 'class-validator';

export class GenerarReporteMedicoHospital {
  @IsString()
  @IsNotEmpty()
  nombreHospital: string;

  @IsString()
  @IsNotEmpty()
  direccionHospital: string;

  @IsString()
  @IsNotEmpty()
  emailHospital: string;

  @IsString()
  @IsNotEmpty()
  telHospital: string;
}
