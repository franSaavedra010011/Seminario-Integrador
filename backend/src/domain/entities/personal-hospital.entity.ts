import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Entity()
export class PersonalHospital extends Base {
  @Column()
  fechaDesde: Date;

  @ManyToOne(() => Hospital, (hospital) => hospital.personalHospital)
  hospital: Hospital;

  @ManyToOne(() => Usuario, (usuario) => usuario.personalHospital)
  usuario: Usuario;
}
