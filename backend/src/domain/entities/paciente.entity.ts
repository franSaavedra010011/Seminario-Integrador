import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';
import { Localidad } from './localidad.entity';

@Entity()
export class Paciente extends Base {
  @Column()
  nombrePaciente: string;

  @Column()
  apellidoPaciente: string;

  @Column()
  edadPaciente: number;

  @Column()
  fechaNacimientoPaciente: Date;

  @Column()
  celularPaciente: string;

  @Column()
  correoPaciente: string;

  @Column()
  grupoSanguineoPaciente: string;

  @OneToMany(() => Turno, (turno) => turno.paciente, { nullable: true })
  turnos: Turno[];

  @OneToOne(() => Usuario, (usuario) => usuario.paciente, { nullable: true })
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'emailUsuario' })
  usuario: Usuario;

  @OneToMany(
    () => PacienteNotificacion,
    (pacienteNotificacion) => pacienteNotificacion.paciente,
  )
  pacienteNotificaciones: PacienteNotificacion[];

  @ManyToOne(() => Localidad, { nullable: false })
  localidad: Localidad;
}
