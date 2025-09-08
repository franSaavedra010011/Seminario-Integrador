import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class HospitalEspecialidadMedico extends Base {
  @Column()
  fechaDesde: Date;

  @Column({ nullable: true })
  fechaHasta: Date;

  @ManyToOne(
    () => HospitalEspecialidad,
    (hospitalEspecialidad) => hospitalEspecialidad.hospitalEspecialidadMedico,
  )
  @JoinColumn({ name: 'idHospitalEspecialidad' })
  hospitalEspecialidad: HospitalEspecialidad;

  @ManyToOne(() => Medico, (medico) => medico.hospitalEspecialidadMedico)
  @JoinColumn({ name: 'idMedico' })
  medico: Medico;

  @OneToMany(
    () => AgendaSemanal,
    (agendaSemanal) => agendaSemanal.hospitalEspecialidadMedico,
  )
  agendaSemanales: AgendaSemanal[];
}
