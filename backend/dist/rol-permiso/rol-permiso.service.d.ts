import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { UpdateRolPermisoDto } from './dto/update-rol-permiso.dto';
export declare class RolPermisoService {
    create(createRolPermisoDto: CreateRolPermisoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRolPermisoDto: UpdateRolPermisoDto): string;
    remove(id: number): string;
}
