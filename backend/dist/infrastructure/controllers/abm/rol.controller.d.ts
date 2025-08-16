import { AbmRolUseCase } from "src/application/use-cases/abm/rol/abm-rol.use-case";
import { CreateRolDto } from "src/application/use-cases/abm/rol/dto/create-rol.dto";
import { UpdateRolDto } from "src/application/use-cases/abm/rol/dto/update-rol.dto";
import { Rol } from "src/domain/entities/rol.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
import { AbmBaseController } from "./abm-base.controller";
export declare class RolController extends AbmBaseController<Rol, CreateRolDto, UpdateRolDto> {
    constructor(abmRolUseCase: AbmRolUseCase, genericRepositoryService: GenericRepositoryService);
}
