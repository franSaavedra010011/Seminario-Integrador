import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreateTurnoDto } from './dto/create-turno.dto';
export declare class AbmTurnoUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreateTurnoDto): Promise<Turno>;
    eliminar(id: number): Promise<void>;
}
