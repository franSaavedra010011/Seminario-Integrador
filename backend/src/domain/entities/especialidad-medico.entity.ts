import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class EspecialidadMedico extends Base {
  @Column()
  fechaDesde: Date;

  @Column({ nullable: true })
  fechaHasta: Date;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.especialidadesMedico)
  @JoinColumn({ name: 'idEspecialidad' }) // opcional, si querés especificar
  especialidad: Especialidad;

  @ManyToOne(() => Medico, (medico) => medico.especialidadesMedico, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idMedico' }) // opcional
  medico: Medico;
}
