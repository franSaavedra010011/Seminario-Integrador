import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { DiaSemanaEnum } from '../enums/dia-semana.enum';

@Entity()
export class AgendaDia extends Base {
  @Column({
    type: 'enum',
    enum: DiaSemanaEnum,
    nullable: false,
  })
  nombreAgendaDia: DiaSemanaEnum;

  @ManyToOne(() => AgendaSemanal, agendaSemanal => agendaSemanal.agendasDia, {
    nullable: false,
  })
  @JoinColumn({ name: 'idAgendaSemanal' }) // opcional
  agendaSemanal: AgendaSemanal;

  @OneToMany(() => TurnoAgendaDia, turnoAgendaDia => turnoAgendaDia.agendaDia)
  turnosAgendaDia: TurnoAgendaDia[];
}
