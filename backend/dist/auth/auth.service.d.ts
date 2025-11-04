import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { RegisterDTO } from './dto/register.dto';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly abmUsuarioUseCase;
    private readonly jwtService;
    private readonly genericRepository;
    private readonly usuarioRepo;
    constructor(abmUsuarioUseCase: AbmUsuarioUseCase, jwtService: JwtService, genericRepository: GenericRepositoryService, usuarioRepo: Repository<Usuario>);
    register(registerDto: RegisterDTO): Promise<Usuario>;
    login({ email, password }: LoginDTO): Promise<{
        token: string;
        rolSeleccionado: string;
        permisos: string[];
        usuarioId?: undefined;
        email?: undefined;
        roles?: undefined;
    } | {
        usuarioId: number;
        email: string;
        roles: {
            idRol: number;
            nombreRol: string;
        }[];
        token?: undefined;
        rolSeleccionado?: undefined;
        permisos?: undefined;
    }>;
    seleccionarRol(usuarioId: number, idRol: number): Promise<{
        token: string;
        rolSeleccionado: string;
        permisos: string[];
    }>;
    profile({ email, rol, roles, }: {
        email: string;
        rol?: string;
        roles?: string[];
    }): Promise<Usuario>;
}
