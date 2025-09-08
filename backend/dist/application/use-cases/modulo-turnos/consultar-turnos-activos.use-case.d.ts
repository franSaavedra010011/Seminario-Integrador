import { Paciente } from 'src/domain/entities/paciente.entity';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { ConsultarTurnosActivosDTO } from './dto/consultar-turnos-activos.dto';
export declare class ConsultarTurnosActivosUseCase {
    private readonly genericRepository;
    private pacienteRepository;
    constructor(genericRepository: GenericRepositoryService, pacienteRepository: Repository<Paciente>);
    consultarTurnosActivos(mailPaciente: string): Promise<ConsultarTurnosActivosDTO[]>;
}
