import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
export declare class PermisoController {
    private readonly permisoService;
    constructor(permisoService: PermisoService);
    create(createPermisoDto: CreatePermisoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePermisoDto: UpdatePermisoDto): string;
    remove(id: string): string;
}
