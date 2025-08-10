import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { AbmHospitalUseCase } from './../../../application/use-cases/abm/hospital/abm-hospital.use-case';
import { Body, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/create-hospital.dto';
import { UpdateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/update-hospital.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
export class HospitalController {
    
    constructor(
        private readonly abmHospitalUseCase: AbmHospitalUseCase,
        private readonly GenericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() dto: CreateHospitalDto) {
        return this.abmHospitalUseCase.crear(dto);
    }

    @Put('modificacion/:id')
    async modificacion(@Param('id') id: number, @Body() dto: UpdateHospitalDto) {
        return this.abmHospitalUseCase.actualizar(id, dto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.GenericRepositoryService.eliminar(Hospital, id);
    }
}