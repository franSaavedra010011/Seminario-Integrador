import { BuscarEspecialidadesDTO } from './dtos/buscarEspecialidades.dto';
import { GenericRepositoryService } from 'src/common/utils/genericRepository.service';
export declare class EspecialidadService {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    buscarEspecialidades(idHospitalSeleccionado: number): Promise<BuscarEspecialidadesDTO[]>;
}
