import { CreateHospitalEspecialidadMedicoDto } from './dto/create-hospital-especialidad-medico.dto';
import { UpdateHospitalEspecialidadMedicoDto } from './dto/update-hospital-especialidad-medico.dto';
export declare class HospitalEspecialidadMedicoService {
    create(createHospitalEspecialidadMedicoDto: CreateHospitalEspecialidadMedicoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateHospitalEspecialidadMedicoDto: UpdateHospitalEspecialidadMedicoDto): string;
    remove(id: number): string;
}
