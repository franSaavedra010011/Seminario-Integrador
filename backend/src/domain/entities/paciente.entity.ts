import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ nullable: true })
  fechaHoraBajaPaciente: Date;

  @OneToMany(() => Turno, (turno) => turno.paciente, { nullable: true })
  turnos: Turno[];

  @OneToOne(() => Usuario, (usuario) => usuario.pacientes, { nullable: true })
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'emailUsuario' })
  usuario: Usuario;

  @OneToMany(
    () => PacienteNotificacion,
    (pacienteNotificacion) => pacienteNotificacion.paciente,
  )
  pacienteNotificaciones: PacienteNotificacion[];

  public get getNombrePaciente(): string {
    return this.nombrePaciente;
  }

  public set setNombrePaciente(value: string) {
    this.nombrePaciente = value.trim();
  }

  public get getApellidoPaciente(): string {
    return this.apellidoPaciente;
  }

  public set setApellidoPaciente(value: string) {
    this.apellidoPaciente = value.trim();
  }

  public get getEdadPaciente(): number {
    return this.edadPaciente;
  }

  public set setEdadPaciente(value: number) {
    this.edadPaciente = value;
  }

  public get getFechaNacimientoPaciente(): Date {
    return this.fechaNacimientoPaciente;
  }

  public set setFechaNacimientoPaciente(value: Date) {
    this.fechaNacimientoPaciente = value;
  }

  public get getCelularPaciente(): string {
    return this.celularPaciente;
  }

  public set setCelularPaciente(value: string) {
    this.celularPaciente = value.trim();
  }

  public get getCorreoPaciente(): string {
    return this.correoPaciente;
  }

  public set setCorreoPaciente(value: string) {
    this.correoPaciente = value.trim();
  }

  public get getGrupoSanguineoPaciente(): string {
    return this.grupoSanguineoPaciente;
  }

  public set setGrupoSanguineoPaciente(value: string) {
    this.grupoSanguineoPaciente = value.trim();
  }

  public get getFechaHoraBajaPaciente(): Date {
    return this.fechaHoraBajaPaciente;
  }

  public set setFechaHoraBajaPaciente(value: Date) {
    this.fechaHoraBajaPaciente = value;
  }

  public get getTurnos(): Turno[] {
    return this.turnos;
  }

  public set setTurnos(value: Turno[]) {
    this.turnos = value;
  }

  public get getPacienteNotificacion(): PacienteNotificacion[] {
    return this.pacienteNotificaciones;
  }

  public set setPacienteNotificacion(
    pacienteNotificaciones: PacienteNotificacion[],
  ) {
    this.pacienteNotificaciones = pacienteNotificaciones;
  }
}
