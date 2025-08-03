import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalEspecialidadMedicoService } from './hospital-especialidad-medico.service';
import { CreateHospitalEspecialidadMedicoDto } from './dto/create-hospital-especialidad-medico.dto';
import { UpdateHospitalEspecialidadMedicoDto } from './dto/update-hospital-especialidad-medico.dto';

@Controller('hospital-especialidad-medico')
export class HospitalEspecialidadMedicoController {
  constructor(private readonly hospitalEspecialidadMedicoService: HospitalEspecialidadMedicoService) {}

  @Post()
  create(@Body() createHospitalEspecialidadMedicoDto: CreateHospitalEspecialidadMedicoDto) {
    return this.hospitalEspecialidadMedicoService.create(createHospitalEspecialidadMedicoDto);
  }

  @Get()
  findAll() {
    return this.hospitalEspecialidadMedicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalEspecialidadMedicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalEspecialidadMedicoDto: UpdateHospitalEspecialidadMedicoDto) {
    return this.hospitalEspecialidadMedicoService.update(+id, updateHospitalEspecialidadMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalEspecialidadMedicoService.remove(+id);
  }
}
