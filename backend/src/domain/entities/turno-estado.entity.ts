import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TurnoEstado {
  @PrimaryGeneratedColumn()
  idTurnoEstado: number;

  @Column()
  fechaDesdeTurnoEstado: Date;

  @Column({ nullable: true })
  fechaHastaTurnoEstado: Date;

  @ManyToOne(() => Turno, (turno) => turno.turnosEstados)
  turno: Turno;

  @ManyToOne(() => EstadoTurno, (estadoTurno) => estadoTurno.turnosEstados)
  estadoTurno: EstadoTurno;

  public get getIdTurnoEstado(): number {
    return this.idTurnoEstado;
  }

  public get getFechaDesdeTurnoEstado(): Date {
    return this.fechaDesdeTurnoEstado;
  }

  public set setFechaDesdeTurnoEstado(value: Date) {
    this.fechaDesdeTurnoEstado = value;
  }

  public get getFechaHastaTurnoEstado(): Date {
    return this.fechaHastaTurnoEstado;
  }

  public set setFechaHastaTurnoEstado(value: Date) {
    this.fechaHastaTurnoEstado = value;
  }

  public get getEstadoTurno(): EstadoTurno {
    return this.estadoTurno;
  }

  public set setEstadoTurno(value: EstadoTurno) {
    this.estadoTurno = value;
  }
}
