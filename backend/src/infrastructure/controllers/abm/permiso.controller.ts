import { Body, Delete, Param, Post, Put } from "@nestjs/common";
import { AbmPermisoUseCase } from "src/application/use-cases/abm/permiso/abm-permiso.use-case";
import { CreatePermisoDto } from "src/application/use-cases/abm/permiso/dto/create-permiso.dto";
import { UpdatePermisoDto } from "src/application/use-cases/abm/permiso/dto/update-permiso.dto";
import { Permiso } from "src/domain/entities/permiso.entity";
import { GenericRepositoryService } from "src/shared/utils/genericRepository.service";

export class PermisoController {
    
    constructor(
        private readonly abmPermisoUseCase: AbmPermisoUseCase,
        private readonly genericRepositoryService: GenericRepositoryService,
    ) {}

    @Post('alta')
    async alta(@Body() createPermisoDto: CreatePermisoDto) {
        return this.abmPermisoUseCase.crear(createPermisoDto);
    }

    @Put('modificar/:id')
    async modificar(@Param('id') id: number, @Body() updatePermisoDto: UpdatePermisoDto) {
        return this.abmPermisoUseCase.actualizar(id, updatePermisoDto);
    }

    @Delete('baja/:id')
    async baja(@Param('id') id: number) {
        return this.genericRepositoryService.eliminar(Permiso, id);
    }
}