import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarPorcentajePacientesDTO } from './dto/consultar-porcentaje-pacientes.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';
export declare class ConsultarPorcentajeDeAsistenciaDePacientesUseCase {
    private readonly genericRepository;
    private usuarioRepository;
    private hospitalRepository;
    private turnoRepository;
    constructor(genericRepository: GenericRepositoryService, usuarioRepository: Repository<Usuario>, hospitalRepository: Repository<Hospital>, turnoRepository: Repository<Turno>);
    consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario: string): Promise<ConsultarPorcentajePacientesDTO[]>;
    consultarPorcentajeAsistenciaPacientes(idHospital: Number): Promise<number>;
}
