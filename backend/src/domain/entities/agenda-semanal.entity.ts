import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { AgendaDia } from './agenda-dia.entity';
import { HospitalEspecialidadMedico } from './hospital-especialidad-medico.entity';

@Entity()
export class AgendaSemanal extends Base {
  @Column()
  fechaDesdeAgendaSemanal: Date;

  @Column()
  fechaHastaAgendaSemanal: Date;

  @Column()
  nroSemana: number;

  @ManyToOne(() => HospitalEspecialidadMedico, (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.agendaSemanales)
  @JoinColumn({ name: 'idHospitalEspecialidadMedico' }) 
  hospitalEspecialidadMedico: HospitalEspecialidadMedico;

  @OneToMany(() => AgendaDia, (agendaDia) => agendaDia.agendaSemanal)
  agendasDia: AgendaDia[];
}
