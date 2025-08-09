import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { RolEnum } from '../enums/rol.enum';

@Entity()
export class Rol extends Base {
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  usuarioRoles: UsuarioRol[];

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.rol)
  rolPermisos: RolPermiso[];
}
