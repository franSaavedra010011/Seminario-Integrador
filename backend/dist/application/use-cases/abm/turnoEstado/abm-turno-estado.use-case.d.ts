import { TurnoEstado } from 'src/domain/entities/turno-estado.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateTurnoEstadoDto } from './dto/create-turnoEstado.dto';
export declare class AbmTurnoEstadoUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreateTurnoEstadoDto): Promise<TurnoEstado>;
    eliminar(id: number): Promise<void>;
}
