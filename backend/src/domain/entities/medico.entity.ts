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

  // Medico -> Turno (1:N)
  @OneToMany(() => Turno, (turno) => turno.paciente, { cascade: true, onDelete: 'CASCADE', nullable: true })
  turnos: Turno[];

  // Medico -> Usuario (1:1)
  @OneToOne(() => Usuario, (usuario) => usuario.medico, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idUsuario', referencedColumnName: 'id' })
  usuario: Usuario;

  // Medico -> EspecialidadMedico (1:N)
  @OneToMany(
    () => EspecialidadMedico,
    (especialidadMedico) => especialidadMedico.medico,
    { cascade: true, onDelete: 'CASCADE' },
  )
  especialidadesMedico: EspecialidadMedico[];

  // Medico -> HistoriaMedica (1:N)
  @OneToMany(() => HistoriaMedica, (historiaMedica) => historiaMedica.medico, { cascade: true, onDelete: 'CASCADE', nullable: true })
  historiasMedica: HistoriaMedica[];

  // Medico -> HospitalEspecialidadMedico (1:N)
  @OneToMany(
    () => HospitalEspecialidadMedico,
    (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.medico,
    { cascade: true, onDelete: 'CASCADE' },
  )
  hospitalEspecialidadMedico: HospitalEspecialidadMedico[];
}
