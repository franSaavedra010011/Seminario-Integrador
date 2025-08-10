import { Body, Delete, Param, Post, Put } from '@nestjs/common';
import { Paciente } from './../../../domain/entities/paciente.entity';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/update-paciente.dto';
export class PacienteController {
    
    constructor(
        private readonly abmPacienteUseCase: AbmPacienteUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() dto: CreatePacienteDto) {
        return this.abmPacienteUseCase.crear(dto);
    }
    
    @Put('modificacion/:id')
    async modificacion(@Param('id') id: number, @Body() dto: UpdatePacienteDto) {
        return this.abmPacienteUseCase.actualizar(id, dto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(Paciente, id);
    }
}