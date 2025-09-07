import { GenericRepositoryService } from '../../../shared/services/genericRepository.service';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Especialidad } from './../../../domain/entities/especialidad.entity';
import { AbmEspecialidadUseCase } from 'src/application/use-cases/abm/especialidad/abm-especialidad.use-case';
import { CreateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/create-especialidad.dto';
import { AbmBaseController } from './abm-base.controller';
import { UpdateEspecialidadDto } from 'src/application/use-cases/abm/especialidad/dto/update-especialidad.dto';

@Controller('especialidad')
export class EspecialidadController extends AbmBaseController<
    Especialidad,
    CreateEspecialidadDto,
    UpdateEspecialidadDto
> {
    constructor(
        abmEspecialidadUseCase: AbmEspecialidadUseCase,
        genericRepositoryService: GenericRepositoryService,
    ) {
        super(abmEspecialidadUseCase, genericRepositoryService, Especialidad);
    }
}