import { Base } from './base.entity';
import { Paciente } from './paciente.entity';
import { Medico } from './medico.entity';
import { EstadoTurno } from './estado-turno.entity';
import { TurnoEstado } from './turno-estado.entity';
import { Especialidad } from './especialidad.entity';
import { HistoriaMedica } from './historia-medica.entity';
import { TurnoAgendaDia } from './turno-agenda-dia.entity';
import { Hospital } from './hospital.entity';
import { PacienteNotificacion } from './paciente-notificacion.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Turno extends Base {
  @Column()
  fecha: Date;

  @Column()
  hora: string;

  @Column()
  observaciones: string;

  @Column()
  presentismo: boolean;

  @ManyToOne(() => Paciente, (paciente) => paciente.turnos)
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.turnos)
  medico: Medico;

  @OneToOne(() => EstadoTurno, (estadoTurno) => estadoTurno.turnos)
  @JoinColumn()
  estadoTurno: EstadoTurno;

  @OneToMany(() => TurnoEstado, (turnoEstado) => turnoEstado.turno)
  turnosEstados: TurnoEstado[];

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.turnos)
  especialidad: Especialidad;

  @OneToMany(() => HistoriaMedica, (historiaMedica) => historiaMedica.turno)
  historiasMedica: HistoriaMedica[];

  @OneToOne(() => TurnoAgendaDia, (turnoAgendaDia) => turnoAgendaDia.turno)
  turnoAgendaDia: TurnoAgendaDia;

  @ManyToOne(() => Hospital, (hospital) => hospital.turnos)
  hospital: Hospital;

  @OneToMany(
    () => PacienteNotificacion,
    (pacienteNotificacion) => pacienteNotificacion.turno,
  )
  pacienteNotificaciones: PacienteNotificacion[];
}
