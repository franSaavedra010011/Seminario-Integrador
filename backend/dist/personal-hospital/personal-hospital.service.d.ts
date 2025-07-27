import { CreatePersonalHospitalDto } from './dto/create-personal-hospital.dto';
import { UpdatePersonalHospitalDto } from './dto/update-personal-hospital.dto';
export declare class PersonalHospitalService {
    create(createPersonalHospitalDto: CreatePersonalHospitalDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePersonalHospitalDto: UpdatePersonalHospitalDto): string;
    remove(id: number): string;
}
