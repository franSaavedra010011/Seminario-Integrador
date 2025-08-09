import { AgendaDia } from 'src/domain/entities/agenda-dia.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class TurnoAgendaDia extends Base {
  @Column()
  disponible: boolean;

  @Column()
  horaDesde: string;

  @Column()
  horaHasta: string;

  @ManyToOne(() => AgendaDia, (agendaDia) => agendaDia.turnosAgendaDia)
  agendaDia: AgendaDia;

  @OneToOne(() => Turno, (turno) => turno.turnoAgendaDia)
  @JoinColumn()
  turno: Turno;
}
