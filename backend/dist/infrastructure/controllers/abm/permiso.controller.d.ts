import { AbmPermisoUseCase } from "src/application/use-cases/abm/permiso/abm-permiso.use-case";
import { CreatePermisoDto } from "src/application/use-cases/abm/permiso/dto/create-permiso.dto";
import { UpdatePermisoDto } from "src/application/use-cases/abm/permiso/dto/update-permiso.dto";
import { Permiso } from "src/domain/entities/permiso.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
export declare class PermisoController {
    private readonly abmPermisoUseCase;
    private readonly genericRepositoryService;
    constructor(abmPermisoUseCase: AbmPermisoUseCase, genericRepositoryService: GenericRepositoryService);
    alta(createPermisoDto: CreatePermisoDto): Promise<Permiso>;
    modificar(id: number, updatePermisoDto: UpdatePermisoDto): Promise<Permiso>;
    baja(id: number): Promise<void>;
}
