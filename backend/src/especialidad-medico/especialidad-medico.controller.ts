import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EspecialidadMedicoService } from './especialidad-medico.service';
import { CreateEspecialidadMedicoDto } from './dto/create-especialidad-medico.dto';
import { UpdateEspecialidadMedicoDto } from './dto/update-especialidad-medico.dto';

@Controller('especialidad-medico')
export class EspecialidadMedicoController {
  constructor(private readonly especialidadMedicoService: EspecialidadMedicoService) {}

  @Post()
  create(@Body() createEspecialidadMedicoDto: CreateEspecialidadMedicoDto) {
    return this.especialidadMedicoService.create(createEspecialidadMedicoDto);
  }

  @Get()
  findAll() {
    return this.especialidadMedicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadMedicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspecialidadMedicoDto: UpdateEspecialidadMedicoDto) {
    return this.especialidadMedicoService.update(+id, updateEspecialidadMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadMedicoService.remove(+id);
  }
}
