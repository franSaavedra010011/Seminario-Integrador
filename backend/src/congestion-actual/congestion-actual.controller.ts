import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CongestionActualService } from './congestion-actual.service';
import { CreateCongestionActualDto } from './dto/create-congestion-actual.dto';
import { UpdateCongestionActualDto } from './dto/update-congestion-actual.dto';

@Controller('congestion-actual')
export class CongestionActualController {
  constructor(private readonly congestionActualService: CongestionActualService) {}

  @Post()
  create(@Body() createCongestionActualDto: CreateCongestionActualDto) {
    return this.congestionActualService.create(createCongestionActualDto);
  }

  @Get()
  findAll() {
    return this.congestionActualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congestionActualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCongestionActualDto: UpdateCongestionActualDto) {
    return this.congestionActualService.update(+id, updateCongestionActualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congestionActualService.remove(+id);
  }
}
