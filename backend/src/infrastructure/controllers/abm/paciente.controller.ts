import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { Paciente } from './../../../domain/entities/paciente.entity';
import { AbmPacienteUseCase } from 'src/application/use-cases/abm/paciente/abm-paciente.use-case';
import { GenericRepositoryService } from 'src/shared/utils/genericRepository.service';
import { CreatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/application/use-cases/abm/paciente/dto/update-paciente.dto';
import { AbmBaseController } from './abm-base.controller';

@Controller('paciente')
export class PacienteController extends AbmBaseController<
    Paciente,
    CreatePacienteDto,
    UpdatePacienteDto
>{
    constructor(
        abmPacienteUseCase: AbmPacienteUseCase,
        genericRepositoryService: GenericRepositoryService,
    ) {
        super(abmPacienteUseCase, genericRepositoryService, Paciente);
    }
    
}