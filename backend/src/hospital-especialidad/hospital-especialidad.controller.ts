import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalEspecialidadService } from './hospital-especialidad.service';
import { CreateHospitalEspecialidadDto } from './dto/create-hospital-especialidad.dto';
import { UpdateHospitalEspecialidadDto } from './dto/update-hospital-especialidad.dto';

@Controller('hospital-especialidad')
export class HospitalEspecialidadController {
  constructor(private readonly hospitalEspecialidadService: HospitalEspecialidadService) {}

  @Post()
  create(@Body() createHospitalEspecialidadDto: CreateHospitalEspecialidadDto) {
    return this.hospitalEspecialidadService.create(createHospitalEspecialidadDto);
  }

  @Get()
  findAll() {
    return this.hospitalEspecialidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalEspecialidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalEspecialidadDto: UpdateHospitalEspecialidadDto) {
    return this.hospitalEspecialidadService.update(+id, updateHospitalEspecialidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalEspecialidadService.remove(+id);
  }
}
