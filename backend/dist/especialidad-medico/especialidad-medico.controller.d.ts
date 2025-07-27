import { EspecialidadMedicoService } from './especialidad-medico.service';
import { CreateEspecialidadMedicoDto } from './dto/create-especialidad-medico.dto';
import { UpdateEspecialidadMedicoDto } from './dto/update-especialidad-medico.dto';
export declare class EspecialidadMedicoController {
    private readonly especialidadMedicoService;
    constructor(especialidadMedicoService: EspecialidadMedicoService);
    create(createEspecialidadMedicoDto: CreateEspecialidadMedicoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEspecialidadMedicoDto: UpdateEspecialidadMedicoDto): string;
    remove(id: string): string;
}
