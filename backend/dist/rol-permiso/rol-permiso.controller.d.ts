import { RolPermisoService } from './rol-permiso.service';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { UpdateRolPermisoDto } from './dto/update-rol-permiso.dto';
export declare class RolPermisoController {
    private readonly rolPermisoService;
    constructor(rolPermisoService: RolPermisoService);
    create(createRolPermisoDto: CreateRolPermisoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRolPermisoDto: UpdateRolPermisoDto): string;
    remove(id: string): string;
}
