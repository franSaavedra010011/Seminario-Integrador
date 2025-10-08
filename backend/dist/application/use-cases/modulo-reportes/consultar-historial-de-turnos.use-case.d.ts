import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { Repository } from 'typeorm';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { ConsultarTurnosHistorialDTO } from './dto/consultar-turnos-historial.dto';
export declare class ConsultarHistorialDeTurnosUseCase {
    private readonly genericRepository;
    private usuarioRepository;
    constructor(genericRepository: GenericRepositoryService, usuarioRepository: Repository<Usuario>);
    consultarHistorialTurnos(mailUsuario: string): Promise<ConsultarTurnosHistorialDTO[]>;
}
