import { RolPermiso } from 'src/rol-permiso/entities/rol-permiso.entity';
import { UsuarioRol } from 'src/usuario-rol/entities/usuario-rol.entity';
export declare class Rol {
    idRol: number;
    nombreRol: string;
    fechaHoraBajaRol: Date;
    usuarioRoles: UsuarioRol[];
    rolPermisos: RolPermiso[];
    get getIdRol(): number;
    get getNombreRol(): string;
    set setNombreRol(nombre: string);
    get getFechaHoraBajaRol(): Date;
    set setFechaHoraBajaRol(fecha: Date);
    get getRolPermisos(): RolPermiso[];
    set setRolPermisos(rolPermisos: RolPermiso[]);
}
