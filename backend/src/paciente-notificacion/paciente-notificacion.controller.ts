import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacienteNotificacionService } from './paciente-notificacion.service';
import { CreatePacienteNotificacionDto } from './dto/create-paciente-notificacion.dto';
import { UpdatePacienteNotificacionDto } from './dto/update-paciente-notificacion.dto';

@Controller('paciente-notificacion')
export class PacienteNotificacionController {
  constructor(private readonly pacienteNotificacionService: PacienteNotificacionService) {}

  @Post()
  create(@Body() createPacienteNotificacionDto: CreatePacienteNotificacionDto) {
    return this.pacienteNotificacionService.create(createPacienteNotificacionDto);
  }

  @Get()
  findAll() {
    return this.pacienteNotificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacienteNotificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacienteNotificacionDto: UpdatePacienteNotificacionDto) {
    return this.pacienteNotificacionService.update(+id, updatePacienteNotificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacienteNotificacionService.remove(+id);
  }
}
