import { AbmMedicoUseCase } from "src/application/use-cases/abm/medico/abm-medico.use-case";
import { CreateMedicoDto } from "src/application/use-cases/abm/medico/dto/create-medico.dto";
import { UpdateMedicoDto } from "src/application/use-cases/abm/medico/dto/update-medico.dto";
import { Medico } from "src/domain/entities/medico.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
export declare class MedicoController {
    private readonly abmMedicoUseCase;
    private readonly genericRepositoryService;
    constructor(abmMedicoUseCase: AbmMedicoUseCase, genericRepositoryService: GenericRepositoryService);
    alta(createMedicoDto: CreateMedicoDto): Promise<Medico>;
    modificar(id: number, updateMedicoDto: UpdateMedicoDto): Promise<Medico>;
    baja(id: number): Promise<void>;
}
