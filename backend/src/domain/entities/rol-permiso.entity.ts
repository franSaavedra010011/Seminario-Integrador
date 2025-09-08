import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { Rol } from 'src/domain/entities/rol.entity';

@Entity()
export class RolPermiso extends Base {
  @Column()
  fechaDesde: Date;

  @Column({ nullable: true })
  fechaHasta?: Date;

  @ManyToOne(() => Permiso, (permiso) => permiso.rolesPermiso)
  permiso: Permiso;

  @ManyToOne(() => Rol, (rol) => rol.rolPermisos)
  rol: Rol;
}
