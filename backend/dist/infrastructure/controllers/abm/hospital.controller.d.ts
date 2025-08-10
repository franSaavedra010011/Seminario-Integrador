import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { AbmHospitalUseCase } from './../../../application/use-cases/abm/hospital/abm-hospital.use-case';
import { CreateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/create-hospital.dto';
import { UpdateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/update-hospital.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
export declare class HospitalController {
    private readonly abmHospitalUseCase;
    private readonly GenericRepositoryService;
    constructor(abmHospitalUseCase: AbmHospitalUseCase, GenericRepositoryService: GenericRepositoryService);
    alta(dto: CreateHospitalDto): Promise<Hospital>;
    modificacion(id: number, dto: UpdateHospitalDto): Promise<Hospital>;
    baja(id: number): Promise<void>;
}
