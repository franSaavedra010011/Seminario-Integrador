import { GenericRepositoryService } from './../../../shared/utils/genericRepository.service';
import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AbmUsuarioUseCase } from 'src/application/use-cases/abm/usuario/abm-usuario.use-case';
import { CreateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/application/use-cases/abm/usuario/dto/update-usuario.dto';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  
  constructor(
    private readonly abmUsuarioUseCase: AbmUsuarioUseCase,
    private readonly GenericRepositoryService: GenericRepositoryService,
  ) {}

  @Post('alta')
  async alta(@Body() dto: CreateUsuarioDto) {
    return this.abmUsuarioUseCase.crear(dto);
  }

  @Put('modificacion/:id')
  async modificacion(@Param('id') id: number, @Body() dto: UpdateUsuarioDto) {
    return this.abmUsuarioUseCase.actualizar(id, dto);
  }

  @Delete('baja/:id')
  async baja(@Param('id') id: number) {
    return this.GenericRepositoryService.eliminar(Usuario, id);
  }

}
