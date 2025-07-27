import { HospitalEspecialidadService } from './hospital-especialidad.service';
import { CreateHospitalEspecialidadDto } from './dto/create-hospital-especialidad.dto';
import { UpdateHospitalEspecialidadDto } from './dto/update-hospital-especialidad.dto';
export declare class HospitalEspecialidadController {
    private readonly hospitalEspecialidadService;
    constructor(hospitalEspecialidadService: HospitalEspecialidadService);
    create(createHospitalEspecialidadDto: CreateHospitalEspecialidadDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHospitalEspecialidadDto: UpdateHospitalEspecialidadDto): string;
    remove(id: string): string;
}
