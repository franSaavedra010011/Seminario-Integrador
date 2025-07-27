import { Injectable } from '@nestjs/common';
import { CreateHospitalEspecialidadMedicoDto } from './dto/create-hospital-especialidad-medico.dto';
import { UpdateHospitalEspecialidadMedicoDto } from './dto/update-hospital-especialidad-medico.dto';

@Injectable()
export class HospitalEspecialidadMedicoService {
  create(createHospitalEspecialidadMedicoDto: CreateHospitalEspecialidadMedicoDto) {
    return 'This action adds a new hospitalEspecialidadMedico';
  }

  findAll() {
    return `This action returns all hospitalEspecialidadMedico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalEspecialidadMedico`;
  }

  update(id: number, updateHospitalEspecialidadMedicoDto: UpdateHospitalEspecialidadMedicoDto) {
    return `This action updates a #${id} hospitalEspecialidadMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalEspecialidadMedico`;
  }
}
