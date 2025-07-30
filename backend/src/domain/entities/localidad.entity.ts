import { Hospital } from 'src/domain/entities/hospital.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Localidad {
  @PrimaryGeneratedColumn()
  idLocalidad: number;

  @Column()
  nombreLocalidad: string;

  @Column({ nullable: true })
  fechaHoraBajaLocalidad: Date;

  @OneToMany(() => Hospital, (hospital) => hospital.localidad)
  hospitales: Hospital[];

  public get getIdLocalidad() {
    return this.idLocalidad;
  }

  public get getNombreLocalidad() {
    return this.nombreLocalidad;
  }

  public set setNombreLocalidad(nombreLocalidad: string) {
    this.nombreLocalidad = nombreLocalidad;
  }

  public get getFechaHoraBajaLocalidad() {
    return this.fechaHoraBajaLocalidad;
  }

  public set setFechaHoraBajaLocalidad(fechaHoraBaja: Date) {
    this.fechaHoraBajaLocalidad = fechaHoraBaja;
  }
}
