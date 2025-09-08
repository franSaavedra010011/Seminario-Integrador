import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  @MinLength(3)
  nombreHospital: string;

  @IsString()
  @MinLength(5)
  direccionHospital: string;

  @IsOptional()
  @IsEmail()
  emailHospital?: string;

  @IsOptional()
  @IsString()
  telHospital?: string;
}
