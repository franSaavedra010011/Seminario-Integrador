import { Turno } from 'src/domain/entities/turno.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { Repository } from 'typeorm';
export declare class CancelarTurnoUseCase {
    private readonly genericRepository;
    private readonly bajaLogica;
    private turnoRepository;
    private turnoAgendaDiaRepository;
    constructor(genericRepository: GenericRepositoryService, bajaLogica: AbmTurnoUseCase, turnoRepository: Repository<Turno>, turnoAgendaDiaRepository: Repository<TurnoAgendaDia>);
    bajaTurno(idTurnoSeleccionado: number): Promise<void>;
    private getWeekNumber;
}
