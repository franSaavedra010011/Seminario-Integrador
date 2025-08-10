import { AbmRolUseCase } from "src/application/use-cases/abm/rol/abm-rol.use-case";
import { CreateRolDto } from "src/application/use-cases/abm/rol/dto/create-rol.dto";
import { UpdateRolDto } from "src/application/use-cases/abm/rol/dto/update-rol.dto";
import { Rol } from "src/domain/entities/rol.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
export declare class RolController {
    private readonly abmRolUseCase;
    private readonly genericRepositoryService;
    constructor(abmRolUseCase: AbmRolUseCase, genericRepositoryService: GenericRepositoryService);
    alta(createRolDto: CreateRolDto): Promise<Rol>;
    modificar(id: number, updateRolDto: UpdateRolDto): Promise<Rol>;
    baja(id: number): Promise<void>;
}
