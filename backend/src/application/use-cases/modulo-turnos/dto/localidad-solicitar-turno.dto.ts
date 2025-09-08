import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/domain/entities/turno.entity';

export class LocalidadSolicitarTurnoDto {
  @IsNotEmpty()
  @IsString()
  nombreLocalidad: string;

  @IsNotEmpty()
  @IsNumber()
  idLocalidad: number;
}
