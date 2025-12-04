import { Controller } from '@nestjs/common';
import { AbmBaseController } from 'src/infrastructure/controllers/abm/abm-base.controller';
import { AbmPermisoUseCase } from 'src/application/use-cases/abm/permiso/abm-permiso.use-case';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { CreatePermisoDto } from 'src/application/use-cases/abm/permiso/dto/create-permiso.dto';
import { UpdatePermisoDto } from 'src/application/use-cases/abm/permiso/dto/update-permiso.dto';

@Controller('permiso')
export class PermisoController extends AbmBaseController<
  Permiso,
  CreatePermisoDto,
  UpdatePermisoDto
> {
  constructor(
    abmPermisoUseCase: AbmPermisoUseCase,
    genericRepositoryService: GenericRepositoryService,
  ) {
    super(abmPermisoUseCase, genericRepositoryService, Permiso);
  }
}
