import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from './base.entity'; 
import { EstadoTurnoEnum } from '../enums/estado-turno.enum';
@Entity()
export class EstadoTurno extends Base {
  @Column()
  nombre: String;

  @OneToOne(() => Turno, (turno) => turno.estadoTurno)
  turnos: Turno[];

  @OneToMany(() => TurnoEstado, (turnoEstado) => turnoEstado.estadoTurno)
  turnosEstados: TurnoEstado[];
}
