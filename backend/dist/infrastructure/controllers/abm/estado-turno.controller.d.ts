import { AbmEstadoTurnoUseCase } from "src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case";
import { CreateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/create-estado-turno.dto";
import { UpdateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/update-estado-turno.dto";
import { EstadoTurno } from "src/domain/entities/estado-turno.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";
import { AbmBaseController } from "./abm-base.controller";
export declare class EstadoTurnoController extends AbmBaseController<EstadoTurno, CreateEstadoTurnoDto, UpdateEstadoTurnoDto> {
    constructor(abmEstadoTurnoUseCase: AbmEstadoTurnoUseCase, genericRepositoryService: GenericRepositoryService);
}
