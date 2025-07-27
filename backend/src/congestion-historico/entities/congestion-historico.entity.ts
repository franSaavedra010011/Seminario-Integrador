import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CongestionHistorico {
  @PrimaryGeneratedColumn()
  idCongestionHistorico: number;

  @Column()
  fechaCongestionHistorico: Date;

  @Column()
  horaActualizacionCongestionHistorico: number;

  @Column()
  turnosCanceladosCongestionHistorico: number;

  @Column()
  turnosNoAsistidosCongestionHistorico: number;

  @Column()
  turnosAsistidosCongestionHistorico: number;

  @Column()
  turnosMaximoDiaCongestionHistorico: number;

  @Column({ nullable: true })
  fechaHoraBajaCongestionHistorico: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.congestionesHistorico)
  hospital: Hospital;

  public get getIdCongestionHistorico() {
    return this.idCongestionHistorico;
  }

  public get getFechaCongestionHistorico() {
    return this.fechaCongestionHistorico;
  }

  public set setFechaCongestionHistorico(fechaCongestionHistorico: Date) {
    this.fechaCongestionHistorico = fechaCongestionHistorico;
  }

  public get getHoraActualizacionCongestionHistorico() {
    return this.horaActualizacionCongestionHistorico;
  }

  public set setHoraActualizacionCongestionHistorico(
    horaActualizacionCongestionHistorico: number,
  ) {
    this.horaActualizacionCongestionHistorico =
      horaActualizacionCongestionHistorico;
  }

  public get getTurnosCanceladosCongestionHistorico() {
    return this.turnosCanceladosCongestionHistorico;
  }

  public set setTurnosCanceladosCongestionHistorico(
    turnosCanceladosCongestionHistorico: number,
  ) {
    this.turnosCanceladosCongestionHistorico =
      turnosCanceladosCongestionHistorico;
  }

  public get getTurnosNoAsistidosCongestionHistorico() {
    return this.turnosNoAsistidosCongestionHistorico;
  }

  public set setTurnosNoAsistidosCongestionHistorico(
    turnosNoAsistidosCongestionHistorico: number,
  ) {
    this.turnosNoAsistidosCongestionHistorico =
      turnosNoAsistidosCongestionHistorico;
  }

  public get getTurnosAsistidosCongestionHistorico() {
    return this.turnosAsistidosCongestionHistorico;
  }

  public set setTurnosAsistidosCongestionHistorico(
    turnosAsistidosCongestionHistorico: number,
  ) {
    this.turnosAsistidosCongestionHistorico =
      turnosAsistidosCongestionHistorico;
  }

  public get getTurnosMaximoDiaCongestionHistorico() {
    return this.turnosMaximoDiaCongestionHistorico;
  }

  public set setTurnosMaximoDiaCongestionHistorico(
    turnosMaximoDiaCongestionHistorico: number,
  ) {
    this.turnosMaximoDiaCongestionHistorico =
      turnosMaximoDiaCongestionHistorico;
  }

  public get getFechaHoraBajaCongestionHistorico() {
    return this.fechaHoraBajaCongestionHistorico;
  }

  public set setFechaHoraBajaCongestionHistorico(
    fechaHoraBajaCongestionHistorico: Date,
  ) {
    this.fechaHoraBajaCongestionHistorico = fechaHoraBajaCongestionHistorico;
  }
}
