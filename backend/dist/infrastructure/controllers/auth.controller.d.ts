import { AuthService } from '../../auth/auth.service';
import { RegisterDTO } from '../../auth/dto/register.dto';
import { LoginDTO } from '../../auth/dto/login.dto';
import { Request } from 'express';
interface RequestWithUser extends Request {
    usuario: {
        email: string;
        rol?: string;
        roles?: string[];
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDTO: RegisterDTO): Promise<import("../../domain/entities/usuario.entity").Usuario>;
    login(loginDto: LoginDTO): Promise<{
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
    profile(req: RequestWithUser): Promise<import("../../domain/entities/usuario.entity").Usuario>;
}
export {};
