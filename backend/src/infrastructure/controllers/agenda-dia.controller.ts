import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaDiaService } from './agenda-dia.service';
import { CreateAgendaDiaDto } from './dto/create-agenda-dia.dto';
import { UpdateAgendaDiaDto } from './dto/update-agenda-dia.dto';

@Controller('agenda-dia')
export class AgendaDiaController {
  constructor(private readonly agendaDiaService: AgendaDiaService) {}

  @Post()
  create(@Body() createAgendaDiaDto: CreateAgendaDiaDto) {
    return this.agendaDiaService.create(createAgendaDiaDto);
  }

  @Get()
  findAll() {
    return this.agendaDiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaDiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaDiaDto: UpdateAgendaDiaDto) {
    return this.agendaDiaService.update(+id, updateAgendaDiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaDiaService.remove(+id);
  }
}
