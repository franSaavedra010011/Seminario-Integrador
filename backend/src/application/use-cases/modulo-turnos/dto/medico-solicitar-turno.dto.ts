import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MedicoSolicitarTurnoDto {
  @IsNotEmpty()
  @IsNumber()
  idMedico: Number;

  @IsNotEmpty()
  @IsString()
  nombreMedico: String;

  @IsNotEmpty()
  @IsString()
  apellidoMedico: String;

  @IsNotEmpty()
  @IsString()
  matriculaMedico: String;
}
