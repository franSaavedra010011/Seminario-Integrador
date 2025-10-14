import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ConsultarDetalleDelTurnoDTO {
  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
