import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class HistoriaMedica extends Base {
  @Column()
  fecha: Date;

  @Column()
  observaciones: string;

  @ManyToOne(() => Turno, (turno) => turno.historiasMedica)
  @JoinColumn({ name: 'idTurno' })
  turno: Turno;

  @ManyToOne(() => Medico, (medico) => medico.historiasMedica)
  @JoinColumn({ name: 'idMedico' })
  medico: Medico;
}
