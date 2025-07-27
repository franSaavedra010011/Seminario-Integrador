import { Injectable } from '@nestjs/common';
import { CreateCongestionActualDto } from './dto/create-congestion-actual.dto';
import { UpdateCongestionActualDto } from './dto/update-congestion-actual.dto';

@Injectable()
export class CongestionActualService {
  create(createCongestionActualDto: CreateCongestionActualDto) {
    return 'This action adds a new congestionActual';
  }

  findAll() {
    return `This action returns all congestionActual`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congestionActual`;
  }

  update(id: number, updateCongestionActualDto: UpdateCongestionActualDto) {
    return `This action updates a #${id} congestionActual`;
  }

  remove(id: number) {
    return `This action removes a #${id} congestionActual`;
  }
}
