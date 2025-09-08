import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { ConsultarDetalleDelTurnoDTO } from './dto/consultar-detalle-turno.dto';
export declare class ConsultarDetalleDelTurnoUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    consultarDetalleTurno(idTurnoSeleccionado: number): Promise<ConsultarDetalleDelTurnoDTO>;
}
