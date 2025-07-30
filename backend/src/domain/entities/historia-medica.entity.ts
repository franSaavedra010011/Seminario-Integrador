import { Medico } from 'src/domain/entities/medico.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HistoriaMedica {
  @PrimaryGeneratedColumn()
  idHistoriaMedica: number;

  @Column()
  fechaHistoriaMedica: Date;

  @Column()
  observacionesHistoriaMedica: string;

  @Column({ nullable: true })
  fechaHoraBajaHistoriaMedica: Date;

  @ManyToOne(() => Turno, (turno) => turno.historiasMedica)
  turno: Turno;

  @ManyToOne(() => Medico, (medico) => medico.historiasMedica)
  medico: Medico;

  public get getIdHistoriaMedica(): number {
    return this.idHistoriaMedica;
  }

  public get getFechaHistoriaMedica(): Date {
    return this.fechaHistoriaMedica;
  }

  public set setFechaHistoriaMedica(fechaHistoriaMedica: Date) {
    this.fechaHistoriaMedica = fechaHistoriaMedica;
  }

  public get getObservacionesHistoriaMedica(): string {
    return this.observacionesHistoriaMedica;
  }

  public set setObservacionesHistoriaMedica(
    observacionesHistoriaMedica: string,
  ) {
    this.observacionesHistoriaMedica = observacionesHistoriaMedica.trim();
  }

  public get getFechaHoraBajaHistoriaMedica(): Date {
    return this.fechaHoraBajaHistoriaMedica;
  }

  public set setFechaHoraBajaHistoriaMedica(fechaHoraBajaHistoriaMedica: Date) {
    this.fechaHoraBajaHistoriaMedica = fechaHoraBajaHistoriaMedica;
  }

  public get getMedico(): Medico {
    return this.medico;
  }

  public set setMedico(value: Medico) {
    this.medico = value;
  }
}
