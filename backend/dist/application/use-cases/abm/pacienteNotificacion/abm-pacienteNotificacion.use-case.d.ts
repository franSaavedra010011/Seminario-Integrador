import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { PacienteNotificacion } from 'src/domain/entities/paciente-notificacion.entity';
import { CreatePacienteNotificacionDto } from './dto/create-pacienteNotificacion.dto';
export declare class AbmPacienteNotificacionUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreatePacienteNotificacionDto): Promise<PacienteNotificacion>;
    eliminar(id: number): Promise<void>;
}
