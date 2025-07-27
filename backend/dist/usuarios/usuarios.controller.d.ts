import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario>;
    createAdmin(createUsuarioDto: CreateUsuarioDto): Promise<import("./entities/usuario.entity").Usuario | null>;
    findAll(): Promise<import("./entities/usuario.entity").Usuario[]>;
    findOne(id: string): string;
    remove(id: string): string;
}
