import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { TurnoAgendaDia } from 'src/domain/entities/turno-agenda-dia.entity';
import { AbmTurnoUseCase } from '../abm/turno/abm-turno.use-case';
import { Repository } from 'typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarTurnosAsignadosHospitalDTO } from './dto/consultar-cantidad-turnos-asignados-hospitales.dto';
import { Turno } from 'src/domain/entities/turno.entity';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { ConsultarCantidadTurnosAsignadosTurnosDTO } from './dto/consultar-cantidad-turnos-asignados-turnos.dto';
import { Paciente } from 'src/domain/entities/paciente.entity';
export declare class ConsultarCantidadDeTurnosAsignadosUseCase {
    private readonly genericRepository;
    private readonly bajaLogica;
    private usuarioRepository;
    private turnoRepository;
    private pacienteRepository;
    private hospitalRepository;
    private turnoAgendaDiaRepository;
    constructor(genericRepository: GenericRepositoryService, bajaLogica: AbmTurnoUseCase, usuarioRepository: Repository<Usuario>, turnoRepository: Repository<Turno>, pacienteRepository: Repository<Paciente>, hospitalRepository: Repository<Hospital>, turnoAgendaDiaRepository: Repository<TurnoAgendaDia>);
    consultarTurnosAsignadosHospitales(mailUsuario: string): Promise<ConsultarTurnosAsignadosHospitalDTO[]>;
    consultarCantidadTurnosAsignados(idHospital: number, mailUsuario: string): Promise<ConsultarCantidadTurnosAsignadosTurnosDTO[]>;
}
