import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';
export declare class AbmEstadoTurnoUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreateEstadoTurnoDto): Promise<EstadoTurno>;
    actualizar(id: number, dto: UpdateEstadoTurnoDto): Promise<EstadoTurno>;
    eliminar(id: number): Promise<void>;
}
