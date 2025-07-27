import { Medico } from './entities/medico.entity';
import { Repository } from 'typeorm';
import { Hospital } from 'src/hospital/entities/hospital.entity';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';
import { MedicoDTO } from './entities/dtos/CreateMedico.dto';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { HospitalEspecialidad } from 'src/hospital-especialidad/entities/hospital-especialidad.entity';
import { EspecialidadMedico } from 'src/especialidad-medico/entities/especialidad-medico.entity';
import { HospitalEspecialidadMedico } from 'src/hospital-especialidad-medico/entities/hospital-especialidad-medico.entity';
export declare class MedicoService {
    private medicoRepo;
    private hospitalRepo;
    private especialidadRepo;
    private especialidadMedicoRepo;
    private hospitalEspecialidadRepo;
    private hospitalEspecialidadMedicoRepo;
    private readonly genericRepositoryService;
    constructor(medicoRepo: Repository<Medico>, hospitalRepo: Repository<Hospital>, especialidadRepo: Repository<Especialidad>, especialidadMedicoRepo: Repository<EspecialidadMedico>, hospitalEspecialidadRepo: Repository<HospitalEspecialidad>, hospitalEspecialidadMedicoRepo: Repository<HospitalEspecialidadMedico>, genericRepositoryService: GenericRepositoryService);
    create(dtoMedico: MedicoDTO): Promise<Medico>;
    findAll(): Promise<Medico[]>;
}
