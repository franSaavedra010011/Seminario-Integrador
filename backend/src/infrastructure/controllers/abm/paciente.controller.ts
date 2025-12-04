import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Paciente } from './../../../domain/entities/paciente.entity';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { GenericRepositoryService } from 'src/shared/services/genericRepository.service';
import { CreatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/update-paciente.dto';
import { AbmBaseController } from './abm-base.controller';

@Controller('paciente')
export class PacienteController {
    constructor(
        private readonly useCase: AbmPacienteUseCase,
        private readonly genericRepo: GenericRepositoryService
    ) {}

    @Put('modificar/:id')
    async modificar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePacienteDto) {
        return this.useCase.actualizar(id, dto);
    }

    @Delete('baja/:id')
    async baja(@Param('id', ParseIntPipe) id: number) {
        return this.useCase.eliminar(id);
    }
}