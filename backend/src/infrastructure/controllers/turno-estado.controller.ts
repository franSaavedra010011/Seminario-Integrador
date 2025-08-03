import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurnoEstadoService } from './turno-estado.service';
import { CreateTurnoEstadoDto } from './dto/create-turno-estado.dto';
import { UpdateTurnoEstadoDto } from './dto/update-turno-estado.dto';

@Controller('turno-estado')
export class TurnoEstadoController {
  constructor(private readonly turnoEstadoService: TurnoEstadoService) {}

  @Post()
  create(@Body() createTurnoEstadoDto: CreateTurnoEstadoDto) {
    return this.turnoEstadoService.create(createTurnoEstadoDto);
  }

  @Get()
  findAll() {
    return this.turnoEstadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnoEstadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTurnoEstadoDto: UpdateTurnoEstadoDto) {
    return this.turnoEstadoService.update(+id, updateTurnoEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnoEstadoService.remove(+id);
  }
}
