import { HospitalEspecialidadMedicoService } from './hospital-especialidad-medico.service';
import { CreateHospitalEspecialidadMedicoDto } from './dto/create-hospital-especialidad-medico.dto';
import { UpdateHospitalEspecialidadMedicoDto } from './dto/update-hospital-especialidad-medico.dto';
export declare class HospitalEspecialidadMedicoController {
    private readonly hospitalEspecialidadMedicoService;
    constructor(hospitalEspecialidadMedicoService: HospitalEspecialidadMedicoService);
    create(createHospitalEspecialidadMedicoDto: CreateHospitalEspecialidadMedicoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHospitalEspecialidadMedicoDto: UpdateHospitalEspecialidadMedicoDto): string;
    remove(id: string): string;
}
