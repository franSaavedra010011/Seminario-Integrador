import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { AbmMedicoUseCase } from "src/application/use-cases/abm/medico/abm-medico.use-case";
import { CreateMedicoDto } from "src/application/use-cases/abm/medico/dto/create-medico.dto";
import { UpdateMedicoDto } from "src/application/use-cases/abm/medico/dto/update-medico.dto";
import { Medico } from "src/domain/entities/medico.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";

export class MedicoController {
    
    constructor(
        private readonly abmMedicoUseCase: AbmMedicoUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() createMedicoDto: CreateMedicoDto) {
        return this.abmMedicoUseCase.crear(createMedicoDto);
    }

    @Put('modificar/:id')
    async modificar(@Param('id') id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
        return this.abmMedicoUseCase.actualizar(id, updateMedicoDto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(Medico, id);
    }
}