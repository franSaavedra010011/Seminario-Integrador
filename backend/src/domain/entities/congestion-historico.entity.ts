import { Hospital } from 'src/domain/entities/hospital.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class CongestionHistorico extends Base {
  @Column()
  fecha: Date;

  @Column()
  horaActualizacion: number;

  @Column()
  turnosCancelados: number;

  @Column()
  turnosNoAsistidos: number;

  @Column()
  turnosAsistidos: number;

  @Column()
  turnosMaximoDia: number;

  @ManyToOne(() => Hospital, (hospital) => hospital.congestionesHistorico)
  @JoinColumn({ name: 'idHospital' })
  hospital: Hospital;
}
