import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { AbmEstadoTurnoUseCase } from "src/application/use-cases/abm/estado-turno/abm-estado-turno.use-case";
import { CreateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/create-estado-turno.dto";
import { UpdateEstadoTurnoDto } from "src/application/use-cases/abm/estado-turno/dto/update-estado-turno.dto";
import { EstadoTurno } from "src/domain/entities/estado-turno.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";

@Controller('estado-turno')
export class EstadoTurnoController {

    constructor(
        private readonly abmEstadoTurnoUseCase: AbmEstadoTurnoUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() dto: CreateEstadoTurnoDto) {
        return this.abmEstadoTurnoUseCase.crear(dto);
    }

    @Put('modificacion/:id')
    async modificacion(@Param('id') id: number, @Body() dto: UpdateEstadoTurnoDto) {
        return this.abmEstadoTurnoUseCase.actualizar(id, dto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(EstadoTurno, id);
    }
}