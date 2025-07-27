import { Injectable } from '@nestjs/common';
import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';

@Injectable()
export class EstadoTurnoService {
  create(createEstadoTurnoDto: CreateEstadoTurnoDto) {
    return 'This action adds a new estadoTurno';
  }

  findAll() {
    return `This action returns all estadoTurno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoTurno`;
  }

  update(id: number, updateEstadoTurnoDto: UpdateEstadoTurnoDto) {
    return `This action updates a #${id} estadoTurno`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoTurno`;
  }
}
