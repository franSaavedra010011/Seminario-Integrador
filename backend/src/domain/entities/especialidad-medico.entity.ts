import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { Medico } from 'src/domain/entities/medico.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EspecialidadMedico {
  @PrimaryGeneratedColumn()
  idEspecialidadMedico: number;

  @Column()
  fechaDesdeEspecialidadMedico: Date;

  @Column({ nullable: true })
  fechaHastaEspecialidadMedico: Date;

  @ManyToOne(
    () => Especialidad,
    (especialidad) => especialidad.especialidadesMedico,
  )
  especialidad: Especialidad;

  @ManyToOne(() => Medico, (medico) => medico.especialidadesMedico)
  medico: Medico;

  public get getIdEspecialidadMedico() {
    return this.idEspecialidadMedico;
  }

  public get getFechaDesdeEspecialidadMedico() {
    return this.fechaDesdeEspecialidadMedico;
  }

  public set setFechaDesdeEspecialidadMedico(
    fechaDesdeEspecialidadMedico: Date,
  ) {
    this.fechaDesdeEspecialidadMedico = fechaDesdeEspecialidadMedico;
  }

  public get getFechaHastaEspecialidadMedico() {
    return this.fechaHastaEspecialidadMedico;
  }

  public set setFechaHastaEspecialidadMedico(
    fechaHastaEspecialidadMedico: Date,
  ) {
    this.fechaHastaEspecialidadMedico = fechaHastaEspecialidadMedico;
  }

  public get getMedico() {
    return this.medico;
  }

  public setMedico(medico: Medico): void {
    this.medico = medico;
  }
  public setEspecialidad(especialidad: Especialidad): void {
    this.especialidad = especialidad;
  }
}
