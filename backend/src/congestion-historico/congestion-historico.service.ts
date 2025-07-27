import { Injectable } from '@nestjs/common';
import { CreateCongestionHistoricoDto } from './dto/create-congestion-historico.dto';
import { UpdateCongestionHistoricoDto } from './dto/update-congestion-historico.dto';

@Injectable()
export class CongestionHistoricoService {
  create(createCongestionHistoricoDto: CreateCongestionHistoricoDto) {
    return 'This action adds a new congestionHistorico';
  }

  findAll() {
    return `This action returns all congestionHistorico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congestionHistorico`;
  }

  update(id: number, updateCongestionHistoricoDto: UpdateCongestionHistoricoDto) {
    return `This action updates a #${id} congestionHistorico`;
  }

  remove(id: number) {
    return `This action removes a #${id} congestionHistorico`;
  }
}
