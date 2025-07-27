import { CreateEspecialidadMedicoDto } from './dto/create-especialidad-medico.dto';
import { UpdateEspecialidadMedicoDto } from './dto/update-especialidad-medico.dto';
export declare class EspecialidadMedicoService {
    create(createEspecialidadMedicoDto: CreateEspecialidadMedicoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEspecialidadMedicoDto: UpdateEspecialidadMedicoDto): string;
    remove(id: number): string;
}
