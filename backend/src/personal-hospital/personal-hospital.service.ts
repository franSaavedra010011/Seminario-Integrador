import { Injectable } from '@nestjs/common';
import { CreatePersonalHospitalDto } from './dto/create-personal-hospital.dto';
import { UpdatePersonalHospitalDto } from './dto/update-personal-hospital.dto';

@Injectable()
export class PersonalHospitalService {
  create(createPersonalHospitalDto: CreatePersonalHospitalDto) {
    return 'This action adds a new personalHospital';
  }

  findAll() {
    return `This action returns all personalHospital`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalHospital`;
  }

  update(id: number, updatePersonalHospitalDto: UpdatePersonalHospitalDto) {
    return `This action updates a #${id} personalHospital`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalHospital`;
  }
}
