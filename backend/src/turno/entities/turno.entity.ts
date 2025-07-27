import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { EstadoTurno } from 'src/estado-turno/entities/estado-turno.entity';
import { TurnoEstado } from 'src/turno-estado/entities/turno-estado.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { HistoriaMedica } from 'src/historia-medica/entities/historia-medica.entity';
import { TurnoAgendaDia } from 'src/turno-agenda-dia/entities/turno-agenda-dia.entity';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { PacienteNotificacion } from 'src/paciente-notificacion/entities/paciente-notificacion.entity';

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  idTurno: number;

  @Column()
  fechaAltaTurno: Date;

  @Column()
  fechaTurno: Date;

  @Column()
  horaTurno: string;

  @Column()
  observaconesTurno: string;

  @Column()
  presentismoTurno: boolean;

  @Column({ nullable: true })
  fechaHoraBajaTurno: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.turnos)
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.turnos)
  medico: Medico;

  @OneToOne(() => EstadoTurno, (estadoTurno) => estadoTurno.turno)
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

  public get getIdTurno() {
    return this.idTurno;
  }

  public get getFechaAltaTurno() {
    return this.fechaAltaTurno;
  }

  public set setFechaAltaTurno(value: Date) {
    this.fechaAltaTurno = value;
  }

  public get getFechaTurno() {
    return this.fechaTurno;
  }

  public set setFechaTurno(value: Date) {
    this.fechaTurno = value;
  }

  public get getHoraTurno() {
    return this.horaTurno;
  }

  public set setHoraTurno(value: string) {
    this.horaTurno = value;
  }

  public get getObservaconesTurno() {
    return this.observaconesTurno;
  }

  public set setObservaconesTurno(value: string) {
    this.observaconesTurno = value;
  }

  public get getPresentismoTurno() {
    return this.presentismoTurno;
  }

  public set setPresentismoTurno(value: boolean) {
    this.presentismoTurno = value;
  }

  public get getFechaHoraBajaTurno() {
    return this.fechaHoraBajaTurno;
  }

  public set setFechaHoraBajaTurno(value: Date) {
    this.fechaHoraBajaTurno = value;
  }

  public get getMedico() {
    return this.medico;
  }

  public set setMedico(value: Medico) {
    this.medico = value;
  }

  public get getEstadoTurno() {
    return this.estadoTurno;
  }

  public set setEstadoTurno(value: EstadoTurno) {
    this.estadoTurno = value;
  }

  public get getTurnosEstados() {
    return this.turnosEstados;
  }

  public set setTurnosEstados(value: TurnoEstado[]) {
    this.turnosEstados = value;
  }

  public get getEspecialidad() {
    return this.especialidad;
  }

  public set setEspecialidad(value: Especialidad) {
    this.especialidad = value;
  }

  public get getHistoriasMedica() {
    return this.historiasMedica;
  }

  public set setHistoriasMedica(value: HistoriaMedica[]) {
    this.historiasMedica = value;
  }

  public get getHospital() {
    return this.hospital;
  }

  public set setHospital(value: Hospital) {
    this.hospital = value;
  }
}
