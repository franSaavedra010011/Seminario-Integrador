import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/domain/entities/turno.entity';

export class CreateTurnoDto {
  estadoTurno: EstadoTurno;

  hospital: Hospital;

  especialidad: Especialidad;

  medico: Medico;

  @IsDate()
  @IsNotEmpty()
  fechaTurno: Date;

  @IsString()
  @IsNotEmpty()
  horaTurno: string;

  @IsString()
  descripcion: string | null;
}
