import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Especialidad } from './../../../domain/entities/especialidad.entity';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { CreateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/create-especialidad.dto';

@Controller('especialidad')
export class EspecialidadController {
    
    constructor(
        private readonly abmEspecialidadUseCase: AbmEspecialidadUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() dto: CreateEspecialidadDto) {
        return this.abmEspecialidadUseCase.crear(dto);
    }

    @Put('modificacion/:id')
    async modificacion(@Param('id') id: number, @Body() dto: CreateEspecialidadDto) {
        return this.abmEspecialidadUseCase.actualizar(id, dto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(Especialidad, id);
    }
}