import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HistoriaMedica } from 'src/domain/entities/historia-medica.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

@Entity()
export class Medico extends Base {
  @Column()
  nombreMedico: string;

  @Column()
  apellidoMedico: string;

  @Column()
  dniMedico: string;

  @Column()
  telMedico: string;

  @Column()
  matriculaMedico: string;

  @Column()
  tiempoConsulta: number;

  @OneToMany(() => Turno, (turno) => turno.paciente)
  turnos: Turno[];

  @OneToOne(() => Usuario, (usuario) => usuario.medico)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'emailUsuario' })
  usuario: Usuario;

  @OneToMany(
    () => EspecialidadMedico,
    (especialidadMedico) => especialidadMedico.medico,
  )
  especialidadesMedico: EspecialidadMedico[];

  @OneToMany(() => HistoriaMedica, (historiaMedica) => historiaMedica.medico)
  historiasMedica: HistoriaMedica[];

  @OneToMany(
    () => HospitalEspecialidadMedico,
    (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.medico,
  )
  hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
}
