import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from '../domain/entities/usuario.entity';
import { Repository } from 'typeorm';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { UsuarioRolService } from 'src/usuario-rol/usuario-rol.service';
import { UsuarioRol } from 'src/domain/entities/usuario-rol.entity';
import { MedicoService } from 'src/medico/medico.service';
export declare class UsuariosService {
    private readonly usuarioRepository;
    private readonly usuarioRolRepository;
    private readonly genericRepositoryService;
    private readonly usuarioRolService;
    private readonly medicoService;
    constructor(usuarioRepository: Repository<Usuario>, usuarioRolRepository: Repository<UsuarioRol>, genericRepositoryService: GenericRepositoryService, usuarioRolService: UsuarioRolService, medicoService: MedicoService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario>;
    createAdmin(createUsuarioDto: CreateUsuarioDto): Promise<Usuario | null>;
    findOneByEmailWithPassword(emailUsuario: string): Promise<Usuario | null>;
    findOneByEmail(emailUsuario: string): Promise<Usuario | null>;
    findAll(): Promise<Usuario[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
