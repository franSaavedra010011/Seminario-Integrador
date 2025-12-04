import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/domain/entities/turno.entity';

export class CreateTurnoEstadoDto {
  estadoTurno: EstadoTurno;

  turno: Turno;
}
