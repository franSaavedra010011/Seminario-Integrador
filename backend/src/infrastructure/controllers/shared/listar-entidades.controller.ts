import { Controller, Get } from '@nestjs/common';
import { ListarEntidadesService } from 'src/shared/services/listar-entidades.service';

@Controller('listas')
export class ListarEntidadesController {
  constructor(private readonly listarSvc: ListarEntidadesService) {}

  @Get('hospitales')
  hospitales() {
    return this.listarSvc.listarHospitales();
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
}
