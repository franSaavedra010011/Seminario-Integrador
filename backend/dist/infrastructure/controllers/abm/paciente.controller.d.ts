import { Paciente } from './../../../domain/entities/paciente.entity';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/update-paciente.dto';
export declare class PacienteController {
    private readonly abmPacienteUseCase;
    private readonly genericRepositoryService;
    constructor(abmPacienteUseCase: AbmPacienteUseCase, genericRepositoryService: GenericRepositoryService);
    alta(dto: CreatePacienteDto): Promise<Paciente>;
    modificacion(id: number, dto: UpdatePacienteDto): Promise<Paciente>;
    baja(id: number): Promise<void>;
}
