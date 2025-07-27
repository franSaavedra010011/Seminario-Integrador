import { CongestionActual } from 'src/congestion-actual/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/congestion-historico/entities/congestion-historico.entity';
import { HospitalEspecialidad } from 'src/hospital-especialidad/entities/hospital-especialidad.entity';
import { Localidad } from 'src/localidad/entities/localidad.entity';
import { PersonalHospital } from 'src/personal-hospital/entities/personal-hospital.entity';
import { Turno } from 'src/turno/entities/turno.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  idHospital: number;

  @Column()
  nombreHospital: string;

  @Column()
  direccionHospital: string;

  @Column()
  emailHospital: string;

  @Column()
  telHospital: string;

  @Column({ nullable: true })
  fechaHoraBajaHospital: Date;

  @OneToMany(
    () => HospitalEspecialidad,
    (hospitalEspecialidad) => hospitalEspecialidad.hospital,
    { eager: true },
  )
  hospitalEspecialidades: HospitalEspecialidad[];

  @OneToMany(
    () => CongestionHistorico,
    (congestionHistorico) => congestionHistorico.hospital,
  )
  congestionesHistorico: CongestionHistorico[];

  @ManyToOne(() => Localidad, (localidad) => localidad.hospitales)
  localidad: Localidad;

  @OneToMany(
    () => CongestionActual,
    (congestionActual) => congestionActual.hospital,
  )
  congestionesActual: CongestionActual[];

  @OneToMany(
    () => PersonalHospital,
    (personalHospital) => personalHospital.hospital,
  )
  personalHospital: PersonalHospital[];

  @OneToMany(() => Turno, (turno) => turno.hospital)
  turnos: Turno[];

  public get getIdHospital() {
    return this.idHospital;
  }

  public get getNombreHospital() {
    return this.nombreHospital;
  }

  public set setNombreHospital(nombreHospital: string) {
    this.nombreHospital = nombreHospital;
  }

  public get getDireccionHospital() {
    return this.direccionHospital;
  }

  public set setDireccionHospital(direccionHospital: string) {
    this.direccionHospital = direccionHospital;
  }

  public get getEmailHospital() {
    return this.emailHospital;
  }

  public set setEmailHospital(emailHospital: string) {
    this.emailHospital = emailHospital;
  }

  public get getTelHospital() {
    return this.telHospital;
  }

  public set setTelHospital(telHospital: string) {
    this.telHospital = telHospital;
  }

  public get getFechaHoraBajaHospital() {
    return this.fechaHoraBajaHospital;
  }

  public setFechaHoraBajaHospital(fechaHoraBajaHospital: Date): void {
    this.fechaHoraBajaHospital = fechaHoraBajaHospital;
  }

  public getHospitalEspecialidades(): HospitalEspecialidad[] {
    return this.hospitalEspecialidades;
  }

  public set setHospitalEspecialidades(
    hospitalEspecialidades: HospitalEspecialidad[],
  ) {
    this.hospitalEspecialidades = hospitalEspecialidades;
  }

  public get getCongestionesHistorico() {
    return this.congestionesHistorico;
  }

  public set setCongestionesHistorico(
    congestionesHistorico: CongestionHistorico[],
  ) {
    this.congestionesHistorico = congestionesHistorico;
  }

  public get getLocalidad() {
    return this.localidad;
  }

  public set setLocalidad(localidad: Localidad) {
    this.localidad = localidad;
  }

  public get getCongestionesActual() {
    return this.congestionesActual;
  }

  public set setCongestionesActual(congestionesActual: CongestionActual[]) {
    this.congestionesActual = congestionesActual;
  }
}
