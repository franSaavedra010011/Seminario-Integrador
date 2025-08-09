import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
export declare class AbmHospitalUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreateHospitalDto): Promise<Hospital>;
    actualizar(id: number, dto: UpdateHospitalDto): Promise<Hospital>;
    eliminar(id: number): Promise<void>;
}
