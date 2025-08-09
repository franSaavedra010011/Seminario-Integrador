import { Base } from './base.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
export declare class Rol extends Base {
    nombre: string;
    usuarioRoles: UsuarioRol[];
    rolPermisos: RolPermiso[];
}
