import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurnoAgendaDiaService } from './turno-agenda-dia.service';
import { CreateTurnoAgendaDiaDto } from './dto/create-turno-agenda-dia.dto';
import { UpdateTurnoAgendaDiaDto } from './dto/update-turno-agenda-dia.dto';

@Controller('turno-agenda-dia')
export class TurnoAgendaDiaController {
  constructor(private readonly turnoAgendaDiaService: TurnoAgendaDiaService) {}

  @Post()
  create(@Body() createTurnoAgendaDiaDto: CreateTurnoAgendaDiaDto) {
    return this.turnoAgendaDiaService.create(createTurnoAgendaDiaDto);
  }

  @Get()
  findAll() {
    return this.turnoAgendaDiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnoAgendaDiaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoAgendaDiaDto: UpdateTurnoAgendaDiaDto) {
    return this.turnoAgendaDiaService.update(+id, updateTurnoAgendaDiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnoAgendaDiaService.remove(+id);
  }
}
