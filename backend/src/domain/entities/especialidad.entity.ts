import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Especialidad extends Base {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Turno, (turno) => turno.especialidad)
  turnos: Turno[];

  @OneToMany(() => EspecialidadMedico, (em) => em.especialidad)
  especialidadesMedico: EspecialidadMedico[];

  @OneToMany(() => HospitalEspecialidad, (he) => he.especialidad)
  hospitalEspecialidades: HospitalEspecialidad[];
}
