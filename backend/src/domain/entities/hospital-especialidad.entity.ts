import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class HospitalEspecialidad extends Base {
  @Column()
  fechaDesde: Date;

  @Column({ nullable: true })
  fechaHasta: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.hospitalEspecialidades)
  @JoinColumn({ name: 'idHospital' })
  hospital: Hospital;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.hospitalEspecialidades, {
    eager: true,
  })
  @JoinColumn({ name: 'idEspecialidad' })
  especialidad: Especialidad;

  @OneToMany(
    () => HospitalEspecialidadMedico,
    (heMedico) => heMedico.hospitalEspecialidad,
  )
  hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
}
