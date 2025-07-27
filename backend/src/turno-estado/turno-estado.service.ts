import { Injectable } from '@nestjs/common';
import { CreateTurnoEstadoDto } from './dto/create-turno-estado.dto';
import { UpdateTurnoEstadoDto } from './dto/update-turno-estado.dto';

@Injectable()
export class TurnoEstadoService {
  create(createTurnoEstadoDto: CreateTurnoEstadoDto) {
    return 'This action adds a new turnoEstado';
  }

  findAll() {
    return `This action returns all turnoEstado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turnoEstado`;
  }

  update(id: number, updateTurnoEstadoDto: UpdateTurnoEstadoDto) {
    return `This action updates a #${id} turnoEstado`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnoEstado`;
  }
}
