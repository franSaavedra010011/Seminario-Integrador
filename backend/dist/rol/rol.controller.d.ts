import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
export declare class RolController {
    private readonly rolService;
    constructor(rolService: RolService);
    create(createRolDto: CreateRolDto): string;
    buscarRoles(): Promise<import("./dto/buscarRoles.dto").BuscarRolesDTO[]>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRolDto: UpdateRolDto): string;
    remove(id: string): string;
}
