import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ConsultarPorcentajePacientesDTO {
  @IsString()
  @IsNotEmpty()
  nombreHospital: string;

  @IsNumber()
  @IsNotEmpty()
  idHospital: Number;
}
