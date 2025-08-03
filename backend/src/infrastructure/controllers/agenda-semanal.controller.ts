import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaSemanalService } from './agenda-semanal.service';
import { CreateAgendaSemanalDto } from './dto/create-agenda-semanal.dto';
import { UpdateAgendaSemanalDto } from './dto/update-agenda-semanal.dto';

@Controller('agenda-semanal')
export class AgendaSemanalController {
  constructor(private readonly agendaSemanalService: AgendaSemanalService) {}

  @Post()
  create(@Body() createAgendaSemanalDto: CreateAgendaSemanalDto) {
    return this.agendaSemanalService.create(createAgendaSemanalDto);
  }

  @Get()
  findAll() {
    return this.agendaSemanalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaSemanalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaSemanalDto: UpdateAgendaSemanalDto) {
    return this.agendaSemanalService.update(+id, updateAgendaSemanalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaSemanalService.remove(+id);
  }
}
