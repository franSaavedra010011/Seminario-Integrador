import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Turno } from 'src/domain/entities/turno.entity';
import { EstadoTurno } from 'src/domain/entities/estado-turno.entity';
import { GenerarReporteAdministrativo } from './dto/Generar-reporte-administrativo.dto';
export declare class GenerarReporteAdministrativoUseCase {
    private readonly genericRepository;
    private turnoRepository;
    private hospitalRepository;
    private estadoTurnoRepository;
    constructor(genericRepository: GenericRepositoryService, turnoRepository: Repository<Turno>, hospitalRepository: Repository<Hospital>, estadoTurnoRepository: Repository<EstadoTurno>);
    generarReporteAdministrativoHospital(idHospital: number): Promise<string>;
    generarReporteAdministrativo(idHospital: Number, fechaDesde: Date, fechaHasta: Date): Promise<GenerarReporteAdministrativo>;
}
