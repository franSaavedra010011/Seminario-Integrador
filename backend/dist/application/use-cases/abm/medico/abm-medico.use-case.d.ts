import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { Medico } from 'src/domain/entities/medico.entity';
import { EspecialidadMedico } from 'src/domain/entities/especialidad-medico.entity';
import { HospitalEspecialidad } from 'src/domain/entities/hospital-especialidad.entity';
import { HospitalEspecialidadMedico } from 'src/domain/entities/hospital-especialidad-medico.entity';
export declare class AbmMedicoUseCase {
    private readonly especialidadMedicoRepo;
    private readonly hospitalEspecialidadMedicoRepo;
    private readonly hospitalEspecialidadRepo;
    private readonly genericRepository;
    constructor(especialidadMedicoRepo: Repository<EspecialidadMedico>, hospitalEspecialidadMedicoRepo: Repository<HospitalEspecialidadMedico>, hospitalEspecialidadRepo: Repository<HospitalEspecialidad>, genericRepository: GenericRepositoryService);
    crear(dto: CreateMedicoDto): Promise<Medico>;
    actualizar(id: number, dto: Partial<Medico>): Promise<Medico>;
    eliminar(id: number): Promise<void>;
}
