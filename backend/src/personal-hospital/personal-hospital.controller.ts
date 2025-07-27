import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalHospitalService } from './personal-hospital.service';
import { CreatePersonalHospitalDto } from './dto/create-personal-hospital.dto';
import { UpdatePersonalHospitalDto } from './dto/update-personal-hospital.dto';

@Controller('personal-hospital')
export class PersonalHospitalController {
  constructor(private readonly personalHospitalService: PersonalHospitalService) {}

  @Post()
  create(@Body() createPersonalHospitalDto: CreatePersonalHospitalDto) {
    return this.personalHospitalService.create(createPersonalHospitalDto);
  }

  @Get()
  findAll() {
    return this.personalHospitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalHospitalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalHospitalDto: UpdatePersonalHospitalDto) {
    return this.personalHospitalService.update(+id, updatePersonalHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalHospitalService.remove(+id);
  }
}
