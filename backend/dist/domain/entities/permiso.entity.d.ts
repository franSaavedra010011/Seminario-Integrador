import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
export declare class Permiso {
    idPermiso: number;
    rutaPermiso: string;
    fechaHoraBajaPermiso: Date;
    rolesPermiso: RolPermiso[];
    get getIdPermiso(): number;
    get getRutaPermiso(): string;
    set setRutaPermiso(ruta: string);
    get getFechaHoraBajaPermiso(): Date;
    set setFechaHoraBajaPermiso(fecha: Date);
}
