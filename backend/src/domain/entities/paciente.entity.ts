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

// 🔹 Tipo de dato embebido
export class Vacuna {
  nombre: string;
  fechaAplicacion?: Date;
  dosis?: string;
}

@Entity()
export class Paciente extends Base {
  @Column()
  nombrePaciente: string;

  @Column()
  apellidoPaciente: string;

  @Column()
  dniPaciente: string;

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

  // 🔹 Campos nuevos (opcionales)
  @Column({ nullable: true })
  familiaresACargo?: string;

  @Column({ type: 'text', nullable: true })
  problemasEnCurso?: string;

  @Column({ type: 'text', nullable: true })
  antecedentesHeredofamiliares?: string;

  @Column({ type: 'text', nullable: true })
  habitos?: string;

  @Column({ type: 'text', nullable: true })
  alergias?: string;

  @Column({ type: 'jsonb', nullable: true })
  vacunas?: Vacuna[];

  @OneToMany(() => Turno, (turno) => turno.paciente, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  turnos: Turno[];

  @OneToOne(() => Usuario, (usuario) => usuario.paciente, { nullable: true })
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'emailUsuario' })
  usuario: Usuario;

  @OneToMany(
    () => PacienteNotificacion,
    (pacienteNotificacion) => pacienteNotificacion.paciente,
    { cascade: true, onDelete: 'CASCADE' },
  )
  pacienteNotificaciones: PacienteNotificacion[];

  @ManyToOne(() => Localidad, { nullable: false })
  localidad: Localidad;
}
