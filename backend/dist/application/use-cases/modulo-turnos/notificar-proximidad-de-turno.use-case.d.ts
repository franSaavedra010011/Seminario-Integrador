import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { Turno } from 'src/domain/entities/turno.entity';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { AbmPacienteNotificacionUseCase } from '../abm/pacienteNotificacion/abm-pacienteNotificacion.use-case';
export declare class NotificarProximidadDeTurnoUseCase {
    private readonly genericRepository;
    private turnoRepository;
    private pacienteRepository;
    private readonly abmPacienteNotificacionUseCase;
    constructor(genericRepository: GenericRepositoryService, turnoRepository: Repository<Turno>, pacienteRepository: Repository<Paciente>, abmPacienteNotificacionUseCase: AbmPacienteNotificacionUseCase);
    notificarProximidadDeTurno(): Promise<void>;
}
