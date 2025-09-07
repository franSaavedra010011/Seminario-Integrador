import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { AbmMedicoUseCase } from "src/application/use-cases/abm/medico/abm-medico.use-case";
import { CreateMedicoDto } from "src/application/use-cases/abm/medico/dto/create-medico.dto";
import { UpdateMedicoDto } from "src/application/use-cases/abm/medico/dto/update-medico.dto";
import { Medico } from "src/domain/entities/medico.entity";
import { GenericRepositoryService } from "src/shared/services/genericRepository.service";
import { AbmBaseController } from "./abm-base.controller";

@Controller('medico')
export class MedicoController extends AbmBaseController<
    Medico,
    CreateMedicoDto,
    UpdateMedicoDto
>{
    constructor(
        abmMedicoUseCase: AbmMedicoUseCase,
        genericRepositoryService: GenericRepositoryService,
    ) {
        super(abmMedicoUseCase, genericRepositoryService, Medico);
    }
    
}