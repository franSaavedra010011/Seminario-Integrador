import { CongestionActual } from 'src/domain/entities/congestion-actual.entity';
import { CongestionHistorico } from 'src/domain/entities/congestion-historico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { Localidad } from 'src/domain/entities/localidad.entity';
import { PersonalHospital } from 'src/domain/entities/personal-hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Hospital extends Base {
  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @OneToMany(() => HospitalEspecialidad, (he) => he.hospital, {
    eager: true,
  })
  hospitalEspecialidades: HospitalEspecialidad[];

  @OneToMany(() => CongestionHistorico, (ch) => ch.hospital)
  congestionesHistorico: CongestionHistorico[];

  @OneToMany(() => CongestionActual, (ca) => ca.hospital)
  congestionesActual: CongestionActual[];

  @OneToMany(() => PersonalHospital, (ph) => ph.hospital)
  personalHospital: PersonalHospital[];

  @OneToMany(() => Turno, (turno) => turno.hospital)
  turnos: Turno[];

  @ManyToOne(() => Localidad, (localidad) => localidad.hospitales)
  @JoinColumn({ name: 'idLocalidad' })
  localidad: Localidad;
}
