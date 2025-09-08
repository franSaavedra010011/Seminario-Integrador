import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Especialidad } from 'src/domain/entities/especialidad.entity';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
export declare class AbmEspecialidadUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreateEspecialidadDto): Promise<Especialidad>;
    actualizar(id: number, dto: UpdateEspecialidadDto): Promise<Especialidad>;
    eliminar(id: number): Promise<void>;
}
