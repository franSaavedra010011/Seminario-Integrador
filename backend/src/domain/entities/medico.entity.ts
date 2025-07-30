import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HistoriaMedica } from 'src/domain/entities/historia-medica.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  idMedico: number;

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

  @Column({ nullable: true })
  fechaHoraBajaMedico: Date;

  @Column({ nullable: true })
  fechaHastaMedico: Date;

  @OneToMany(() => Turno, (turno) => turno.paciente)
  turnos: Turno[];

  @OneToOne(() => Usuario, (usuario) => usuario.medicos)
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

  public get getIdMedico() {
    return this.idMedico;
  }

  public get getNombreMedico() {
    return this.nombreMedico;
  }

  public set setNombreMedico(nombreMedico: string) {
    this.nombreMedico = nombreMedico;
  }

  public get getApellidoMedico() {
    return this.apellidoMedico;
  }

  public set setApellidoMedico(apellidoMedico: string) {
    this.apellidoMedico = apellidoMedico;
  }

  public get getDniMedico() {
    return this.dniMedico;
  }

  public set setDniMedico(dniMedico: string) {
    this.dniMedico = dniMedico;
  }

  public get getTelMedico() {
    return this.telMedico;
  }

  public set setTelMedico(telMedico: string) {
    this.telMedico = telMedico;
  }

  public get getMatriculaMedico() {
    return this.matriculaMedico;
  }

  public set setMatriculaMedico(matriculaMedico: string) {
    this.matriculaMedico = matriculaMedico;
  }

  public get getTiempoConsulta() {
    return this.tiempoConsulta;
  }

  public set setTiempoConsulta(tiempoConsulta: number) {
    this.tiempoConsulta = tiempoConsulta;
  }

  public get getFechaHoraBajaMedico() {
    return this.fechaHoraBajaMedico;
  }

  public set setFechaHoraBajaMedico(fechaHoraBajaMedico: Date) {
    this.fechaHoraBajaMedico = fechaHoraBajaMedico;
  }

  public get getFechaHastaMedico() {
    return this.fechaHastaMedico;
  }

  public set setFechaHastaMedico(fechaHastaMedico: Date) {
    this.fechaHastaMedico = fechaHastaMedico;
  }
}
