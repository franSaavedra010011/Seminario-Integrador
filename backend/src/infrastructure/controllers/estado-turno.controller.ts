import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoTurnoService } from './estado-turno.service';
import { CreateEstadoTurnoDto } from './dto/create-estado-turno.dto';
import { UpdateEstadoTurnoDto } from './dto/update-estado-turno.dto';

@Controller('estado-turno')
export class EstadoTurnoController {
  constructor(private readonly estadoTurnoService: EstadoTurnoService) {}

  @Post()
  create(@Body() createEstadoTurnoDto: CreateEstadoTurnoDto) {
    return this.estadoTurnoService.create(createEstadoTurnoDto);
  }

  @Get()
  findAll() {
    return this.estadoTurnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoTurnoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoTurnoDto: UpdateEstadoTurnoDto) {
    return this.estadoTurnoService.update(+id, updateEstadoTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoTurnoService.remove(+id);
  }
}
