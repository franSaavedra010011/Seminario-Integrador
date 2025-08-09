import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';

@Entity()
export class Permiso extends Base {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  rutaPermiso: string;

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
  rolesPermiso: RolPermiso[];
}
