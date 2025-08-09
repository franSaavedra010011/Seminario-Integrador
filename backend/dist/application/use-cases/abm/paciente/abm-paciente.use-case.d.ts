import { Paciente } from 'src/domain/entities/paciente.entity';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
export declare class AbmPacienteUseCase {
    private readonly genericRepository;
    constructor(genericRepository: GenericRepositoryService);
    crear(dto: CreatePacienteDto): Promise<Paciente>;
    actualizar(id: number, dto: UpdatePacienteDto): Promise<Paciente>;
    eliminar(id: number): Promise<void>;
}
