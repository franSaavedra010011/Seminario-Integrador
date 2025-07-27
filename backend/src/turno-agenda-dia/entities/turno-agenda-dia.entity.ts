import { AgendaDia } from 'src/agenda-dia/entities/agenda-dia.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TurnoAgendaDia {
  @PrimaryGeneratedColumn()
  idTurnoAgendaDia: number;

  @Column()
  disponibleTurnoAgendaDia: boolean;

  @Column()
  horaDesdeTurnoAgendaDia: string;

  @Column()
  horaHastaTurnoAgendaDia: string;

  @Column({ nullable: true })
  fechaHoraBajaTurnoAgendaDia: Date;

  @ManyToOne(() => AgendaDia, (agendaDia) => agendaDia.turnosAgendaDia)
  agendaDia: AgendaDia;

  @OneToOne(() => Turno, (turno) => turno.turnoAgendaDia)
  @JoinColumn()
  turno: Turno;

  public get getIdTurnoAgendaDia(): number {
    return this.idTurnoAgendaDia;
  }

  public get getDisponibleTurnoAgendaDia(): boolean {
    return this.disponibleTurnoAgendaDia;
  }

  public set setDisponibleTurnoAgendaDia(value: boolean) {
    this.disponibleTurnoAgendaDia = value;
  }

  public get getHoraDesdeTurnoAgendaDia(): string {
    return this.horaDesdeTurnoAgendaDia;
  }

  public set setHoraDesdeTurnoAgendaDia(value: string) {
    this.horaDesdeTurnoAgendaDia = value;
  }

  public get getHoraHastaTurnoAgendaDia(): string {
    return this.horaHastaTurnoAgendaDia;
  }

  public set setHoraHastaTurnoAgendaDia(value: string) {
    this.horaHastaTurnoAgendaDia = value;
  }

  public get getFechaHoraBajaTurnoAgendaDia(): Date {
    return this.fechaHoraBajaTurnoAgendaDia;
  }

  public set setFechaHoraBajaTurnoAgendaDia(value: Date) {
    this.fechaHoraBajaTurnoAgendaDia = value;
  }

  public get getTurno(): Turno {
    return this.turno;
  }

  public set setTurno(value: Turno) {
    this.turno = value;
  }
}
