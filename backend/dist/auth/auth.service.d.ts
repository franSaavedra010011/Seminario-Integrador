import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuariosService;
    private readonly jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    register({ usernameUsuario, emailUsuario, passwordUsuario, rol, }: RegisterDTO): Promise<import("../domain/entities/usuario.entity").Usuario>;
    login({ email, password }: LoginDTO): Promise<{
        token: string;
        email: string;
    }>;
    profile({ email, role }: {
        email: string;
        role: string;
    }): Promise<import("../domain/entities/usuario.entity").Usuario | null>;
}
