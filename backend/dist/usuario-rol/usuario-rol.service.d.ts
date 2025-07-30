import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto';
import { UsuarioRol } from '../domain/entities/usuario-rol.entity';
import { Repository } from 'typeorm';
export declare class UsuarioRolService {
    private usuarioRolRepository;
    constructor(usuarioRolRepository: Repository<UsuarioRol>);
    create(createUsuarioRolDto: CreateUsuarioRolDto): Promise<UsuarioRol>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUsuarioRolDto: UpdateUsuarioRolDto): string;
    remove(id: number): string;
}
