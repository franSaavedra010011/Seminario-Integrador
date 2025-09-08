import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { Repository } from 'typeorm';
export declare class AbmUsuarioUseCase {
    private readonly genericRepository;
    private readonly usuarioRolRepo;
    constructor(genericRepository: GenericRepositoryService, usuarioRolRepo: Repository<UsuarioRol>);
    crear(dto: CreateUsuarioDto): Promise<Usuario>;
    actualizar(id: number, dto: UpdateUsuarioDto): Promise<Usuario>;
    eliminar(id: number): Promise<void>;
}
