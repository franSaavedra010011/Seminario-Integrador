import { AbmMedicoUseCase } from "src/application/use-cases/abm/medico/abm-medico.use-case";
import { CreateMedicoDto } from "src/application/use-cases/abm/medico/dto/create-medico.dto";
import { UpdateMedicoDto } from "src/application/use-cases/abm/medico/dto/update-medico.dto";
import { Medico } from "src/domain/entities/medico.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
import { AbmBaseController } from "./abm-base.controller";
export declare class MedicoController extends AbmBaseController<Medico, CreateMedicoDto, UpdateMedicoDto> {
    constructor(abmMedicoUseCase: AbmMedicoUseCase, genericRepositoryService: GenericRepositoryService);
}
