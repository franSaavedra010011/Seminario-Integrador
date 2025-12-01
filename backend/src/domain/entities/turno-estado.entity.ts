import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class TurnoEstado extends Base {
  @Column({ type: 'timestamp' })
  fechaDesde: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaHasta: Date | null;

  @ManyToOne(() => Turno, (turno) => turno.turnosEstados)
  turno: Turno;

  @ManyToOne(() => EstadoTurno, (estadoTurno) => estadoTurno.turnosEstados)
  estadoTurno: EstadoTurno;
}
