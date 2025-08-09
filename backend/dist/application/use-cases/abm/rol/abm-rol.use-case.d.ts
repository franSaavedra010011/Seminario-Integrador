import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from 'src/domain/entities/rol.entity';
import { RolPermiso } from 'src/domain/entities/rol-permiso.entity';
import { Repository } from 'typeorm';
export declare class AbmRolUseCase {
    private readonly rolPermisoRepo;
    private readonly genericRepository;
    constructor(rolPermisoRepo: Repository<RolPermiso>, genericRepository: GenericRepositoryService);
    crear(dto: CreateRolDto): Promise<Rol>;
    actualizar(id: number, dto: UpdateRolDto): Promise<Rol>;
    eliminar(id: number): Promise<void>;
}
