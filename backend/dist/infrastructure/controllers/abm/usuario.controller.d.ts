import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
export declare class UsuarioController {
    private readonly abmUsuarioUseCase;
    private readonly GenericRepositoryService;
    constructor(abmUsuarioUseCase: AbmUsuarioUseCase, GenericRepositoryService: GenericRepositoryService);
    alta(dto: CreateUsuarioDto): Promise<Usuario>;
    modificacion(id: number, dto: UpdateUsuarioDto): Promise<Usuario>;
    baja(id: number): Promise<void>;
}
