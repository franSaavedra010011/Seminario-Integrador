import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { Turno } from 'src/domain/entities/turno.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { AbmTurnoEstadoUseCase } from '../abm/turnoEstado/abm-turno-estado.use-case';
export declare class RegistrarAsistenciaDePacienteUseCase {
    private readonly genericRepository;
    private turnoRepository;
    private estadoTurnoRepository;
    private readonly abmTurnoEstadoUseCase;
    constructor(genericRepository: GenericRepositoryService, turnoRepository: Repository<Turno>, estadoTurnoRepository: Repository<EstadoTurno>, abmTurnoEstadoUseCase: AbmTurnoEstadoUseCase);
    registrarAsistenciaDePaciente(idTurno: Number): Promise<void>;
}
