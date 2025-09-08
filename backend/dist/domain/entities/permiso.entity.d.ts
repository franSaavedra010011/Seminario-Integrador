import { Base } from './base.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
export declare class Permiso extends Base {
    codigo: string;
    descripcion: string;
    categoria: string;
    rolesPermiso: RolPermiso[];
}
