import { Paciente } from 'src/domain/entities/paciente.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class PacienteNotificacion extends Base {
  @Column()
  observacionPacienteNotificacion: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.pacienteNotificaciones)
  paciente: Paciente;

  @ManyToOne(() => Turno, (turno) => turno.pacienteNotificaciones)
  turno: Turno;
}
