import { UsuarioRolService } from './usuario-rol.service';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto';
export declare class UsuarioRolController {
    private readonly usuarioRolService;
    constructor(usuarioRolService: UsuarioRolService);
    create(createUsuarioRolDto: CreateUsuarioRolDto): Promise<import("../domain/entities/usuario-rol.entity").UsuarioRol>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUsuarioRolDto: UpdateUsuarioRolDto): string;
    remove(id: string): string;
}
