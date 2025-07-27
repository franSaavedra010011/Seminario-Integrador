import { Permiso } from 'src/permiso/entities/permiso.entity';
import { Rol } from 'src/rol/entities/rol.entity';
export declare class RolPermiso {
    idRolPermiso: number;
    fechaDesdeRolPermiso: Date;
    fechaHastaRolPermiso: Date;
    permiso: Permiso;
    rol: Rol;
    get getIdRolPermiso(): number;
    get getFechaDesdeRolPermiso(): Date;
    set setFechaDesdeRolPermiso(fecha: Date);
    get getFechaHastaRolPermiso(): Date;
    set setFechaHastaRolPermiso(fecha: Date);
    get getPermiso(): Permiso;
    set setPermiso(permiso: Permiso);
}
