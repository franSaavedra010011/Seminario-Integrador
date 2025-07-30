import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AgendaDia {
  @PrimaryGeneratedColumn()
  idAgendaDia: number;

  @Column()
  nombreAgendaDia: string;

  @Column({ nullable: true })
  fechaHoraBajaAgendaDia: Date;

  @ManyToOne(() => AgendaSemanal, (agendaSemanal) => agendaSemanal.agendasDia)
  agendaSemanal: AgendaSemanal;

  @OneToMany(() => TurnoAgendaDia, (turnoAgendaDia) => turnoAgendaDia.agendaDia)
  turnosAgendaDia: TurnoAgendaDia[];

  public get getIdAgendaDia() {
    return this.idAgendaDia;
  }

  public get getNombreAgendaDia() {
    return this.nombreAgendaDia;
  }

  public set setNombreAgendaDia(nombreAgendaDia: string) {
    this.nombreAgendaDia = nombreAgendaDia;
  }

  public get getFechaHoraBajaAgendaDia() {
    return this.fechaHoraBajaAgendaDia;
  }

  public set setFechaHoraBajaAgendaDia(fechaHoraBajaAgendaDia: Date) {
    this.fechaHoraBajaAgendaDia = fechaHoraBajaAgendaDia;
  }

  public get getTurnosAgendaDia() {
    return this.turnosAgendaDia;
  }

  public set setTurnosAgendaDia(turnosAgendaDia: TurnoAgendaDia[]) {
    this.turnosAgendaDia = turnosAgendaDia;
  }
}
