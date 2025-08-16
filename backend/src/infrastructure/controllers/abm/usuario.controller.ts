import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';
import { AbmBaseController } from './abm-base.controller';

@Controller('usuario')
export class UsuarioController extends AbmBaseController<
    Usuario,
    CreateUsuarioDto,
    UpdateUsuarioDto
>{
    constructor(
        abmUsuarioUseCase: AbmUsuarioUseCase,
        genericRepositoryService: GenericRepositoryService,
    ) {
        super(abmUsuarioUseCase, genericRepositoryService, Usuario);
    } 
  
}
