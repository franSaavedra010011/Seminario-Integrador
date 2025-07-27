import { Injectable } from '@nestjs/common';
import { CreateAgendaSemanalDto } from './dto/create-agenda-semanal.dto';
import { UpdateAgendaSemanalDto } from './dto/update-agenda-semanal.dto';

@Injectable()
export class AgendaSemanalService {
  create(createAgendaSemanalDto: CreateAgendaSemanalDto) {
    return 'This action adds a new agendaSemanal';
  }

  findAll() {
    return `This action returns all agendaSemanal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendaSemanal`;
  }

  update(id: number, updateAgendaSemanalDto: UpdateAgendaSemanalDto) {
    return `This action updates a #${id} agendaSemanal`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendaSemanal`;
  }
}
