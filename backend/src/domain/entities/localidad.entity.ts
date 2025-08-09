import { Hospital } from 'src/domain/entities/hospital.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Localidad extends Base {
  @Column()
  nombre: string;

  @OneToMany(() => Hospital, (hospital) => hospital.localidad)
  hospitales: Hospital[];
}
