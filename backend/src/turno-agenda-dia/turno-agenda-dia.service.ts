import { Injectable } from '@nestjs/common';
import { CreateTurnoAgendaDiaDto } from './dto/create-turno-agenda-dia.dto';
import { UpdateTurnoAgendaDiaDto } from './dto/update-turno-agenda-dia.dto';

@Injectable()
export class TurnoAgendaDiaService {
  create(createTurnoAgendaDiaDto: CreateTurnoAgendaDiaDto) {
    return 'This action adds a new turnoAgendaDia';
  }

  findAll() {
    return `This action returns all turnoAgendaDia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} turnoAgendaDia`;
  }

  update(id: number, updateTurnoAgendaDiaDto: UpdateTurnoAgendaDiaDto) {
    return `This action updates a #${id} turnoAgendaDia`;
  }

  remove(id: number) {
    return `This action removes a #${id} turnoAgendaDia`;
  }
}
