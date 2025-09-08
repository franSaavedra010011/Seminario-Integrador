import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { Especialidad } from './../../../domain/entities/especialidad.entity';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { CreateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/create-especialidad.dto';
import { AbmBaseController } from './abm-base.controller';
import { UpdateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/update-especialidad.dto';
export declare class EspecialidadController extends AbmBaseController<Especialidad, CreateEspecialidadDto, UpdateEspecialidadDto> {
    constructor(abmEspecialidadUseCase: AbmEspecialidadUseCase, genericRepositoryService: GenericRepositoryService);
}
