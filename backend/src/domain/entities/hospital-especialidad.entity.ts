import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HospitalEspecialidad {
  @PrimaryGeneratedColumn()
  idHospitalEspecialidad: number;

  @Column()
  fechaDesdeHospitalEspecialidad: Date;

  @Column({ nullable: true })
  fechaHastaHospitalEspecialidad: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.hospitalEspecialidades)
  hospital: Hospital;

  @ManyToOne(
    () => Especialidad,
    (especialidad) => especialidad.hospitalEspecialidades,
    { eager: true },
  )
  especialidad: Especialidad;

  @OneToMany(
    () => HospitalEspecialidadMedico,
    (hospitalEspecialidadMedico) =>
      hospitalEspecialidadMedico.hospitalEspecialidad,
  )
  hospitalEspecialidadMedico: HospitalEspecialidadMedico[];

  public get getIdHospitalEspecialidad() {
    return this.idHospitalEspecialidad;
  }

  public get getFechaDesdeHospitalEspecialidad() {
    return this.fechaDesdeHospitalEspecialidad;
  }

  public set setFechaDesdeHospitalEspecialidad(
    fechaDesdeHospitalEspecialidad: Date,
  ) {
    this.fechaDesdeHospitalEspecialidad = fechaDesdeHospitalEspecialidad;
  }

  public get getFechaHastaHospitalEspecialidad() {
    return this.fechaHastaHospitalEspecialidad;
  }

  public set setFechaHastaHospitalEspecialidad(
    fechaHastaHospitalEspecialidad: Date,
  ) {
    this.fechaHastaHospitalEspecialidad = fechaHastaHospitalEspecialidad;
  }

  public getHospitalEspecialidadMedico(): HospitalEspecialidadMedico[] {
    return this.hospitalEspecialidadMedico;
  }

  public setHospitalEspecialidadMedico(
    hospitalEspecialidadMedico: HospitalEspecialidadMedico[],
  ): void {
    this.hospitalEspecialidadMedico = hospitalEspecialidadMedico;
  }

  public getEspecialidad(): Especialidad {
    return this.especialidad;
  }

  public set setEspecialidad(especialidad: Especialidad) {
    this.especialidad = especialidad;
  }
}
