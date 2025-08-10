import { AbmEstadoTurnoUseCase } from "src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case";
import { CreateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/create-estado-turno.dto";
import { UpdateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/update-estado-turno.dto";
import { EstadoTurno } from "src/domain/entities/estado-turno.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
export declare class EstadoTurnoController {
    private readonly abmEstadoTurnoUseCase;
    private readonly genericRepositoryService;
    constructor(abmEstadoTurnoUseCase: AbmEstadoTurnoUseCase, genericRepositoryService: GenericRepositoryService);
    alta(dto: CreateEstadoTurnoDto): Promise<EstadoTurno>;
    modificacion(id: number, dto: UpdateEstadoTurnoDto): Promise<EstadoTurno>;
    baja(id: number): Promise<void>;
}
