import { Injectable } from '@nestjs/common';
import { CreateEspecialidadMedicoDto } from './dto/create-especialidad-medico.dto';
import { UpdateEspecialidadMedicoDto } from './dto/update-especialidad-medico.dto';

@Injectable()
export class EspecialidadMedicoService {
  create(createEspecialidadMedicoDto: CreateEspecialidadMedicoDto) {
    return 'This action adds a new especialidadMedico';
  }

  findAll() {
    return `This action returns all especialidadMedico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especialidadMedico`;
  }

  update(id: number, updateEspecialidadMedicoDto: UpdateEspecialidadMedicoDto) {
    return `This action updates a #${id} especialidadMedico`;
  }

  remove(id: number) {
    return `This action removes a #${id} especialidadMedico`;
  }
}
