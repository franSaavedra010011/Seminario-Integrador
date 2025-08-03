import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CongestionHistoricoService } from './congestion-historico.service';
import { CreateCongestionHistoricoDto } from './dto/create-congestion-historico.dto';
import { UpdateCongestionHistoricoDto } from './dto/update-congestion-historico.dto';

@Controller('congestion-historico')
export class CongestionHistoricoController {
  constructor(private readonly congestionHistoricoService: CongestionHistoricoService) {}

  @Post()
  create(@Body() createCongestionHistoricoDto: CreateCongestionHistoricoDto) {
    return this.congestionHistoricoService.create(createCongestionHistoricoDto);
  }

  @Get()
  findAll() {
    return this.congestionHistoricoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congestionHistoricoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCongestionHistoricoDto: UpdateCongestionHistoricoDto) {
    return this.congestionHistoricoService.update(+id, updateCongestionHistoricoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congestionHistoricoService.remove(+id);
  }
}
