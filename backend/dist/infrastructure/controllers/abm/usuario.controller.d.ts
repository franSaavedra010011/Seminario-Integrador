import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { AbmBaseController } from './abm-base.controller';
export declare class UsuarioController extends AbmBaseController<Usuario, CreateUsuarioDto, UpdateUsuarioDto> {
    constructor(abmUsuarioUseCase: AbmUsuarioUseCase, genericRepositoryService: GenericRepositoryService);
}
