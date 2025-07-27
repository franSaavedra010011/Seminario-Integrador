import { Injectable } from '@nestjs/common';
import { CreateAgendaDiaDto } from './dto/create-agenda-dia.dto';
import { UpdateAgendaDiaDto } from './dto/update-agenda-dia.dto';

@Injectable()
export class AgendaDiaService {
  create(createAgendaDiaDto: CreateAgendaDiaDto) {
    return 'This action adds a new agendaDia';
  }

  findAll() {
    return `This action returns all agendaDia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendaDia`;
  }

  update(id: number, updateAgendaDiaDto: UpdateAgendaDiaDto) {
    return `This action updates a #${id} agendaDia`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendaDia`;
  }
}
