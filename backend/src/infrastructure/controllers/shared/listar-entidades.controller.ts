import { Controller, Get, Query } from '@nestjs/common';
import { ListarEntidadesService } from 'src/shared/services/listar-entidades.service';

@Controller('listas')
export class ListarEntidadesController {
  constructor(private readonly listarSvc: ListarEntidadesService) { }

  @Get('hospitales')
  hospitales(
    @Query('modo') modo: 'simple' | 'localidad' | 'completo' = 'simple'
  ) {
    return this.listarSvc.listarHospitales(modo);
  }

  @Get('medicos')
  medicos() {
    return this.listarSvc.listarMedicos();
  }

  @Get('pacientes')
  pacientes() {
    return this.listarSvc.listarPacientes();
  }

  @Get('usuarios')
  usuarios() {
    return this.listarSvc.listarUsuarios();
  }

  @Get('especialidades')
  especialidades() {
    return this.listarSvc.listarEspecialidades();
  }

  @Get('localidades')
  listarLocalidades() {
    return this.listarSvc.listarLocalidades();
  }

  @Get('roles')
  listarRoles() {
    return this.listarSvc.listarRoles();
  }

}
