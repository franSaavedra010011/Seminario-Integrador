import { Controller, Get, Query } from '@nestjs/common';
import { ListarEntidadesService } from 'src/shared/services/listar-entidades.service';

@Controller('listas')
export class ListarEntidadesController {
  constructor(private readonly listarSvc: ListarEntidadesService) { }

  @Get('hospitales')
  hospitales(
    @Query('modo') modo: 'simple' | 'localidad' | 'completo' = 'simple',
    @Query('id') idHospital?: number
  ) {
    return this.listarSvc.listarHospitales(modo, idHospital);
  }

  @Get('especialidades-hospital')
  listarEspecialidadesHospital(@Query('idHospital') idHospital: number) {
    return this.listarSvc.listarEspecialidadesHospital(idHospital)
  }

  @Get('medicos')
  medicos() {
    return this.listarSvc.listarMedicos();
  }

  @Get('pacientes')
  pacientes() {
    return this.listarSvc.listarPacientes();
  }

  @Get('turnos')
  turnos() {
    return this.listarSvc.listarTurnos();
  }

  @Get('turnosPorHospital')
  turnosPorHospital(@Query('idHospital') idHospital: number) {
    console.log('ID Hospital recibido:', idHospital);
    return this.listarSvc.listarTurnosPorHospital(idHospital);
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
