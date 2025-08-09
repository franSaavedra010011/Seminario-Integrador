import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Permiso } from 'src/domain/entities/permiso.entity';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
export declare class AbmPermisoUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreatePermisoDto): Promise<Permiso>;
    actualizar(id: number, dto: UpdatePermisoDto): Promise<Permiso>;
    eliminar(id: number): Promise<void>;
}
