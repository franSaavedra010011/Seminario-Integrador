import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalHospitalDto } from './create-personal-hospital.dto';

export class UpdatePersonalHospitalDto extends PartialType(CreatePersonalHospitalDto) {}
