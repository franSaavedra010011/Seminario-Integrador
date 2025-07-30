import { AgendaSemanal } from 'src/domain/entities/agenda-semanal.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HospitalEspecialidadMedico {
  @PrimaryGeneratedColumn()
  idHospitalEspecialidadMedico: number;

  @Column()
  fechaDesdeHospitalEspecialidadMedico: Date;

  @Column({ nullable: true })
  fechaHastaHospitalEspecialidadMedico: Date;

  @ManyToOne(
    () => HospitalEspecialidad,
    (hospitalEspecialidad) => hospitalEspecialidad.hospitalEspecialidadMedico,
  )
  hospitalEspecialidad: HospitalEspecialidad;

  @ManyToOne(() => Medico, (medico) => medico.hospitalEspecialidadMedico)
  medico: Medico;

  @OneToMany(
    () => AgendaSemanal,
    (agendaSemanal) => agendaSemanal.hospitalEspecialidadMedico,
  )
  agendaSemanales: AgendaSemanal[];

  public get getIdHospitalEspecialidadMedico() {
    return this.idHospitalEspecialidadMedico;
  }

  public get getFechaDesdeHospitalEspecialidadMedico() {
    return this.fechaDesdeHospitalEspecialidadMedico;
  }

  public set setFechaDesdeHospitalEspecialidadMedico(fechaDesde: Date) {
    this.fechaDesdeHospitalEspecialidadMedico = fechaDesde;
  }

  public get getFechaHastaHospitalEspecialidadMedico() {
    return this.fechaHastaHospitalEspecialidadMedico;
  }

  public set setFechaHastaHospitalEspecialidadMedico(fechaHasta: Date) {
    this.fechaHastaHospitalEspecialidadMedico = fechaHasta;
  }

  public get getMedico() {
    return this.medico;
  }

  public setMedico(medico: Medico): void {
    this.medico = medico;
  }

  public get getAgendaSemanales() {
    return this.agendaSemanales;
  }

  public set setAgendaSemanales(agendaSemanales: AgendaSemanal[]) {
    this.agendaSemanales = agendaSemanales;
  }
}
