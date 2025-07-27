import { Injectable } from '@nestjs/common';
import { CreatePacienteNotificacionDto } from './dto/create-paciente-notificacion.dto';
import { UpdatePacienteNotificacionDto } from './dto/update-paciente-notificacion.dto';

@Injectable()
export class PacienteNotificacionService {
  create(createPacienteNotificacionDto: CreatePacienteNotificacionDto) {
    return 'This action adds a new pacienteNotificacion';
  }

  findAll() {
    return `This action returns all pacienteNotificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pacienteNotificacion`;
  }

  update(id: number, updatePacienteNotificacionDto: UpdatePacienteNotificacionDto) {
    return `This action updates a #${id} pacienteNotificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} pacienteNotificacion`;
  }
}
