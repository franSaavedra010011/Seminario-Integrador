import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { BuscarRolesDTO } from './dto/buscarRoles.dto';
export declare class RolService {
    private genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    create(createRolDto: CreateRolDto): string;
    buscarRoles(): Promise<BuscarRolesDTO[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRolDto: UpdateRolDto): string;
    remove(id: number): string;
}
