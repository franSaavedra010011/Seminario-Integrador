import { Injectable } from '@nestjs/common';
import { CreateHospitalEspecialidadDto } from './dto/create-hospital-especialidad.dto';
import { UpdateHospitalEspecialidadDto } from './dto/update-hospital-especialidad.dto';

@Injectable()
export class HospitalEspecialidadService {
  create(createHospitalEspecialidadDto: CreateHospitalEspecialidadDto) {
    return 'This action adds a new hospitalEspecialidad';
  }

  findAll() {
    return `This action returns all hospitalEspecialidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalEspecialidad`;
  }

  update(id: number, updateHospitalEspecialidadDto: UpdateHospitalEspecialidadDto) {
    return `This action updates a #${id} hospitalEspecialidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalEspecialidad`;
  }
}
