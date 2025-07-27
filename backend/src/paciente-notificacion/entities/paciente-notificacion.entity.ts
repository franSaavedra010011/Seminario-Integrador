import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PacienteNotificacion {
  @PrimaryGeneratedColumn()
  idPacienteNotificacion: number;

  @Column()
  observacionPacienteNotificacion: string;

  @Column({ nullable: true })
  fechaHoraBajaPacienteNotificacion: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.pacienteNotificaciones)
  paciente: Paciente;

  @ManyToOne(() => Turno, (turno) => turno.pacienteNotificaciones)
  turno: Turno;

  public get getIdPacienteNotificacion() {
    return this.idPacienteNotificacion;
  }

  public get getObservacionPacienteNotificacion() {
    return this.observacionPacienteNotificacion;
  }

  public set setObservacionPacienteNotificacion(observacion: string) {
    this.observacionPacienteNotificacion = observacion;
  }

  public get getFechaHoraBajaPacienteNotificacion() {
    return this.fechaHoraBajaPacienteNotificacion;
  }

  public set setFechaHoraBajaPacienteNotificacion(fecha: Date) {
    this.fechaHoraBajaPacienteNotificacion = fecha;
  }

  public get getTurno() {
    return this.turno;
  }

  public set setTurno(turno: Turno) {
    this.turno = turno;
  }
}
