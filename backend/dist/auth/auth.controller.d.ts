import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { Request } from 'express';
interface RequestWithUser extends Request {
    usuario: {
        email: string;
        role: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDTO: RegisterDTO): Promise<import("../domain/entities/usuario.entity").Usuario>;
    login(loginDto: LoginDTO): Promise<{
        token: string;
        email: string;
    }>;
    profile(req: RequestWithUser): Promise<import("../domain/entities/usuario.entity").Usuario | null>;
}
export {};
