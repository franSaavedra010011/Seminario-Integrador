import { AgendaDia } from 'src/agenda-dia/entities/agenda-dia.entity';
import { HospitalEspecialidadMedico } from 'src/hospital-especialidad-medico/entities/hospital-especialidad-medico.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AgendaSemanal {
  @PrimaryGeneratedColumn()
  idAgendaSemanal: number;

  @Column()
  fechaDesdeAgendaSemanal: Date;

  @Column()
  fechaHastaAgendaSemanal: Date;

  @Column({ nullable: true })
  fechaHoraBajaAgendaSemanal: Date;

  @Column()
  nroSemana: number;

  @ManyToOne(
    () => HospitalEspecialidadMedico,
    (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.agendaSemanales,
  )
  hospitalEspecialidadMedico: HospitalEspecialidadMedico;

  @OneToMany(() => AgendaDia, (agendaDia) => agendaDia.agendaSemanal)
  agendasDia: AgendaDia[];

  public get getIdAgendaSemanal() {
    return this.idAgendaSemanal;
  }

  public get getFechaDesdeAgendaSemanal() {
    return this.fechaDesdeAgendaSemanal;
  }

  public set setFechaDesdeAgendaSemanal(fechaDesdeAgendaSemanal: Date) {
    this.fechaDesdeAgendaSemanal = fechaDesdeAgendaSemanal;
  }

  public get getFechaHastaAgendaSemanal() {
    return this.fechaHastaAgendaSemanal;
  }

  public set setFechaHastaAgendaSemanal(fechaHastaAgendaSemanal: Date) {
    this.fechaHastaAgendaSemanal = fechaHastaAgendaSemanal;
  }

  public get getFechaHoraBajaAgendaSemanal() {
    return this.fechaHoraBajaAgendaSemanal;
  }

  public set setFechaHoraBajaAgendaSemanal(fechaHoraBajaAgendaSemanal: Date) {
    this.fechaHoraBajaAgendaSemanal = fechaHoraBajaAgendaSemanal;
  }

  public get getNroSemana() {
    return this.nroSemana;
  }

  public set setNroSemana(nroSemana: number) {
    this.nroSemana = nroSemana;
  }

  public get getAgendasDia() {
    return this.agendasDia;
  }

  public set setAgendasDia(agendasDia: AgendaDia[]) {
    this.agendasDia = agendasDia;
  }
}
