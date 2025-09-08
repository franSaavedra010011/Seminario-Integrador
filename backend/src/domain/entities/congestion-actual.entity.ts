import { Hospital } from 'src/domain/entities/hospital.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { NivelCongestionEnum } from '../enums/nivel-congestion.enum';

@Entity()
export class CongestionActual extends Base {
  @Column()
  fecha: Date;

  @Column()
  horaActualizacion: number;

  @Column({
  type: 'enum',
    enum: NivelCongestionEnum,
    default: 'BAJA',
  })
  nivelCongestion: NivelCongestionEnum;

  @Column()
  turnosCancelados: number;

  @Column()
  turnosNoAsistidos: number;

  @Column()
  turnosAsistidos: number;

  @Column()
  turnosEnProceso: number;

  @ManyToOne(() => Hospital, (hospital) => hospital.congestionesActual)
  @JoinColumn({ name: 'idHospital' }) 
  hospital: Hospital;
}
