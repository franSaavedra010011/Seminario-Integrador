import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  idEspecialidad: number;

  @Column()
  nombreEspecialidad: string;

  @Column()
  descripcionEspecialidad: string;

  @Column({ nullable: true })
  fechaHoraBajaEspecialidad: Date;

  @OneToMany(() => Turno, (turno) => turno.especialidad)
  turnos: Turno[];

  @OneToMany(
    () => EspecialidadMedico,
    (especialidadMedico) => especialidadMedico.especialidad,
  )
  especialidadesMedico: EspecialidadMedico[];

  @OneToMany(
    () => HospitalEspecialidad,
    (hospitalEspecialidad) => hospitalEspecialidad.especialidad,
  )
  hospitalEspecialidades: HospitalEspecialidad[];

  public getIdEspecialidad(): number {
    return this.idEspecialidad;
  }

  public get getNombreEspecialidad() {
    return this.nombreEspecialidad;
  }

  public set setNombreEspecialidad(nombreEspecialidad: string) {
    this.nombreEspecialidad = nombreEspecialidad;
  }

  public get getDescripcionEspecialidad() {
    return this.descripcionEspecialidad;
  }

  public set setDescripcionEspecialidad(descripcionEspecialidad: string) {
    this.descripcionEspecialidad = descripcionEspecialidad;
  }

  public get getFechaHoraBajaEspecialidad() {
    return this.fechaHoraBajaEspecialidad;
  }

  public set setFechaHoraBajaEspecialidad(fechaHoraBajaEspecialidad: Date) {
    this.fechaHoraBajaEspecialidad = fechaHoraBajaEspecialidad;
  }

  public getEspecialidadesMedico(): EspecialidadMedico[] {
    return this.especialidadesMedico;
  }

  public setEspecialidadesMedico(
    especialidadesMedico: EspecialidadMedico[],
  ): void {
    this.especialidadesMedico = especialidadesMedico;
  }
}
