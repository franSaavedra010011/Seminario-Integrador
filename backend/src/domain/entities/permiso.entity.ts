import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';

@Entity()
export class Permiso extends Base {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  codigo: string; 

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  categoria: string;

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
  rolesPermiso: RolPermiso[];
}
