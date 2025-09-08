import { Base } from './base.entity';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { Rol } from 'src/domain/entities/rol.entity';
export declare class RolPermiso extends Base {
    fechaDesde: Date;
    fechaHasta?: Date;
    permiso: Permiso;
    rol: Rol;
}
