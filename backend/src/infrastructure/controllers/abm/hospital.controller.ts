import { GenericRepositoryService } from '../../../shared/services/genericRepository.service';
import { AbmHospitalUseCase } from './../../../application/use-cases/abm/hospital/abm-hospital.use-case';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/create-hospital.dto';
import { UpdateHospitalDto } from 'src/application/use-cases/abm/hospital/dto/update-hospital.dto';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { AbmBaseController } from './abm-base.controller';

@Controller('hospital')
export class HospitalController extends AbmBaseController<
    Hospital,
    CreateHospitalDto,
    UpdateHospitalDto
>{
    constructor(
        abmHospitalUseCase: AbmHospitalUseCase,
        genericRepositoryService: GenericRepositoryService,
    ) {
        super(abmHospitalUseCase, genericRepositoryService, Hospital);
    }
}