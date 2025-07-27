import { Injectable } from '@nestjs/common';
import { CreateHistoriaMedicaDto } from './dto/create-historia-medica.dto';
import { UpdateHistoriaMedicaDto } from './dto/update-historia-medica.dto';

@Injectable()
export class HistoriaMedicaService {
  create(createHistoriaMedicaDto: CreateHistoriaMedicaDto) {
    return 'This action adds a new historiaMedica';
  }

  findAll() {
    return `This action returns all historiaMedica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiaMedica`;
  }

  update(id: number, updateHistoriaMedicaDto: UpdateHistoriaMedicaDto) {
    return `This action updates a #${id} historiaMedica`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiaMedica`;
  }
}
