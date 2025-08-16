import { AbmBaseController } from 'src/infrastructure/controllers/abm/abm-base.controller';
import { AbmPermisoUseCase } from 'src/application/use-cases/abm/permiso/abm-permiso.use-case';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { CreatePermisoDto } from 'src/application/use-cases/abm/permiso/dto/create-permiso.dto';
import { UpdatePermisoDto } from 'src/application/use-cases/abm/permiso/dto/update-permiso.dto';
export declare class PermisoController extends AbmBaseController<Permiso, CreatePermisoDto, UpdatePermisoDto> {
    constructor(abmPermisoUseCase: AbmPermisoUseCase, genericRepositoryService: GenericRepositoryService);
}
