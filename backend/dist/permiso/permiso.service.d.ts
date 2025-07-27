import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
export declare class PermisoService {
    create(createPermisoDto: CreatePermisoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePermisoDto: UpdatePermisoDto): string;
    remove(id: number): string;
}
