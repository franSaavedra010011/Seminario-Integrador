import { TurnoEstado } from 'src/turno-estado/entities/turno-estado.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EstadoTurno {
  @PrimaryGeneratedColumn()
  idEstadoTurno: number;

  @Column()
  nombreEstadoTurno: string;

  @Column({ nullable: true })
  fechaHoraBajaEstadoTurno: Date;

  @OneToOne(() => Turno, (turno) => turno.estadoTurno)
  turno: Turno;

  @OneToMany(() => TurnoEstado, (turnoEstado) => turnoEstado.estadoTurno)
  turnosEstados: TurnoEstado[];

  public get getIdEstadoTurno() {
    return this.idEstadoTurno;
  }

  public get getNombreEstadoTurno() {
    return this.nombreEstadoTurno;
  }

  public set setNombreEstadoTurno(nombreEstadoTurno: string) {
    this.nombreEstadoTurno = nombreEstadoTurno;
  }

  public get getFechaHoraBajaEstadoTurno() {
    return this.fechaHoraBajaEstadoTurno;
  }

  public set setFechaHoraBajaEstadoTurno(fechaHoraBajaEstadoTurno: Date) {
    this.fechaHoraBajaEstadoTurno = fechaHoraBajaEstadoTurno;
  }
}
