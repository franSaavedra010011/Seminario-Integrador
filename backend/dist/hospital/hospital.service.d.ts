import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
import { BuscarHospitalesDTO } from './dtos/buscarHospitales.dto';
export declare class HospitalService {
    private genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    buscarHospitales(): Promise<BuscarHospitalesDTO[]>;
}
