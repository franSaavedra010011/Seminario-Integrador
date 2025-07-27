import { CreateHospitalEspecialidadDto } from './dto/create-hospital-especialidad.dto';
import { UpdateHospitalEspecialidadDto } from './dto/update-hospital-especialidad.dto';
export declare class HospitalEspecialidadService {
    create(createHospitalEspecialidadDto: CreateHospitalEspecialidadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateHospitalEspecialidadDto: UpdateHospitalEspecialidadDto): string;
    remove(id: number): string;
}
