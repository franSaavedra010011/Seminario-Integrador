import { PersonalHospitalService } from './personal-hospital.service';
import { CreatePersonalHospitalDto } from './dto/create-personal-hospital.dto';
import { UpdatePersonalHospitalDto } from './dto/update-personal-hospital.dto';
export declare class PersonalHospitalController {
    private readonly personalHospitalService;
    constructor(personalHospitalService: PersonalHospitalService);
    create(createPersonalHospitalDto: CreatePersonalHospitalDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePersonalHospitalDto: UpdatePersonalHospitalDto): string;
    remove(id: string): string;
}
