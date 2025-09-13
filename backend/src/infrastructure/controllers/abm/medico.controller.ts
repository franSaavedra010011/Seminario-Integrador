import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AbmMedicoUseCase } from "src/application/use-cases/abm/medico/abm-medico.use-case";
import { CreateMedicoDto } from "src/application/use-cases/abm/medico/dto/create-medico.dto";
import { UpdateMedicoDto } from "src/application/use-cases/abm/medico/dto/update-medico.dto";
import { Medico } from "src/domain/entities/medico.entity";
import { GenericRepositoryService } from "src/shared/services/genericRepository.service";
import { AbmBaseController } from "./abm-base.controller";

@Controller('medico')
export class MedicoController {
  constructor(
    private readonly useCase: AbmMedicoUseCase,
    private readonly genericRepo: GenericRepositoryService
  ) {}

  @Put('modificar/:id')
  async modificar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMedicoDto) {
    return this.useCase.actualizar(id, dto);
  }

  @Delete('baja/:id')
  async baja(@Param('id', ParseIntPipe) id: number) {
    return this.useCase.eliminar(id);
  }
}
