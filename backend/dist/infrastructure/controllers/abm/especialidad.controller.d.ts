import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { Especialidad } from './../../../domain/entities/especialidad.entity';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { CreateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/create-especialidad.dto';
export declare class EspecialidadController {
    private readonly abmEspecialidadUseCase;
    private readonly genericRepositoryService;
    constructor(abmEspecialidadUseCase: AbmEspecialidadUseCase, genericRepositoryService: GenericRepositoryService);
    alta(dto: CreateEspecialidadDto): Promise<Especialidad>;
    modificacion(id: number, dto: CreateEspecialidadDto): Promise<Especialidad>;
    baja(id: number): Promise<void>;
}
