import { Hospital } from 'src/domain/entities/hospital.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CongestionActual {
  @PrimaryGeneratedColumn()
  idCongestionActual: number;

  @Column()
  fechaCongestionActual: Date;

  @Column()
  horaActualizacionCongestionActual: number;

  @Column()
  turnosCanceladosCongestionActual: number;

  @Column()
  turnosNoAsistidosCongestionActual: number;

  @Column()
  turnosAsistidosCongestionActual: number;

  @Column()
  turnosEnProcesoCongestionActual: number;

  @Column({ nullable: true })
  fechaHoraBajaCongestionActual: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.congestionesActual)
  hospital: Hospital;

  public get getIdCongestionActual() {
    return this.idCongestionActual;
  }

  public get getFechaCongestionActual() {
    return this.fechaCongestionActual;
  }

  public set setFechaCongestionActual(fechaCongestionActual: Date) {
    this.fechaCongestionActual = fechaCongestionActual;
  }

  public get getHoraActualizacionCongestionActual() {
    return this.horaActualizacionCongestionActual;
  }

  public set setHoraActualizacionCongestionActual(
    horaActualizacionCongestionActual: number,
  ) {
    this.horaActualizacionCongestionActual = horaActualizacionCongestionActual;
  }

  public get getTurnosCanceladosCongestionActual() {
    return this.turnosCanceladosCongestionActual;
  }

  public set setTurnosCanceladosCongestionActual(
    turnosCanceladosCongestionActual: number,
  ) {
    this.turnosCanceladosCongestionActual = turnosCanceladosCongestionActual;
  }

  public get getTurnosNoAsistidosCongestionActual() {
    return this.turnosNoAsistidosCongestionActual;
  }

  public set setTurnosNoAsistidosCongestionActual(
    turnosNoAsistidosCongestionActual: number,
  ) {
    this.turnosNoAsistidosCongestionActual = turnosNoAsistidosCongestionActual;
  }

  public get getTurnosAsistidosCongestionActual() {
    return this.turnosAsistidosCongestionActual;
  }

  public set setTurnosAsistidosCongestionActual(
    turnosAsistidosCongestionActual: number,
  ) {
    this.turnosAsistidosCongestionActual = turnosAsistidosCongestionActual;
  }

  public get getTurnosEnProcesoCongestionActual() {
    return this.turnosEnProcesoCongestionActual;
  }

  public set setTurnosEnProcesoCongestionActual(
    turnosEnProcesoCongestionActual: number,
  ) {
    this.turnosEnProcesoCongestionActual = turnosEnProcesoCongestionActual;
  }

  public get getFechaHoraBajaCongestionActual() {
    return this.fechaHoraBajaCongestionActual;
  }

  public set setFechaHoraBajaCongestionActual(
    fechaHoraBajaCongestionActual: Date,
  ) {
    this.fechaHoraBajaCongestionActual = fechaHoraBajaCongestionActual;
  }
}
