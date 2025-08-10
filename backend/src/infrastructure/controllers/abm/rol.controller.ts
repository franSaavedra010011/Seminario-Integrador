import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { AbmRolUseCase } from "src/application/use-cases/abm/rol/abm-rol.use-case";
import { CreateRolDto } from "src/application/use-cases/abm/rol/dto/create-rol.dto";
import { UpdateRolDto } from "src/application/use-cases/abm/rol/dto/update-rol.dto";
import { Rol } from "src/domain/entities/rol.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";

export class RolController {
    
    constructor(
        private readonly abmRolUseCase: AbmRolUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() createRolDto: CreateRolDto) {
        return this.abmRolUseCase.crear(createRolDto);
    }

    @Put('modificar/:id')
    async modificar(@Param('id') id: number, @Body() updateRolDto: UpdateRolDto) {
        return this.abmRolUseCase.actualizar(id, updateRolDto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(Rol, id);
    }
}