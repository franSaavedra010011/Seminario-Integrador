import { Hospital } from 'src/domain/entities/hospital.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonalHospital {
  @PrimaryGeneratedColumn()
  idPersonalHospital: number;

  @Column()
  fechaDesdePersonalHospital: Date;

  @Column({ nullable: true })
  fechaHastaPersonalHospital: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.personalHospital)
  hospital: Hospital;

  @ManyToOne(() => Usuario, (usuario) => usuario.personalHospital)
  usuario: Usuario;

  public get getIdPersonalHospital() {
    return this.idPersonalHospital;
  }

  public get getFechaDesdePersonalHospital() {
    return this.fechaDesdePersonalHospital;
  }

  public set setFechaDesdePersonalHospital(fecha: Date) {
    this.fechaDesdePersonalHospital = fecha;
  }

  public get getFechaHastaPersonalHospital() {
    return this.fechaHastaPersonalHospital;
  }

  public set setFechaHastaPersonalHospital(fecha: Date) {
    this.fechaHastaPersonalHospital = fecha;
  }

  public get getHospital() {
    return this.hospital;
  }

  public set setHospital(hospital: Hospital) {
    this.hospital = hospital;
  }
}
