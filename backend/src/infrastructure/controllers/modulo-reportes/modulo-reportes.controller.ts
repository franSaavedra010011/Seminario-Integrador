import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ConsultarCantidadDeTurnosAsignadosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case';
import { ConsultarHistorialDeTurnosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case';
import { ConsultarPorcentajeDeAsistenciaDePacientesUseCase } from 'src/application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case';

@Controller('moduloReportes')
export class ModuloDeReporteController {
  constructor(
    // private readonly useCaseCancelarTurno: CancelarTurnoUseCase,
    private readonly useCaseConsultarCantidadTurnosAsignados: ConsultarCantidadDeTurnosAsignadosUseCase,
    private readonly useCaseConsultarHistorialTurnos: ConsultarHistorialDeTurnosUseCase,
    private readonly useCaseConsultarPorcentajeDeAsistenciaDePacientes: ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
  ) {}
  //UseCase: Cancelar Turno
  //   @Delete('cancelarTurno/:id')
  //   cancelarTurno(@Param('id') turnoSeleccionado: string) {
  //     console.log('entre al controlador');
  //     this.useCaseCancelarTurno.bajaTurno(Number(turnoSeleccionado));
  //   }
  //UseCase: Consultar cantidad de turnos asignados
  @Get('consultarTurnosAsignadosHospitales/:emailUsuario')
  consultarTurnosAsignadosHospitales(
    @Param('emailUsuario') emailUsuario: string,
  ) {
    return this.useCaseConsultarCantidadTurnosAsignados.consultarTurnosAsignadosHospitales(
      emailUsuario,
    );
  }
  @Get('consultarCantidadTurnosAsignados/:mailUsuario/:idHospital')
  consultarCantidadTurnosAsignados(
    @Param('idHospital') idHospital: string,
    @Param('mailUsuario') mailUsuario: string,
  ) {
    return this.useCaseConsultarCantidadTurnosAsignados.consultarCantidadTurnosAsignados(
      Number(idHospital),
      mailUsuario,
    );
  }
  @Get('consultarHistorialTurnos/:mailUsuario')
  consultarHistorialTurnos(@Param('mailUsuario') mailUsuario: string) {
    return this.useCaseConsultarHistorialTurnos.consultarHistorialTurnos(
      mailUsuario,
    );
  }
  @Get('consultarPorcentajeAsistenciaPacientesHospital/:mailUsuario')
  consultarPorcentajeAsistenciaPacientesHospitales(
    @Param('mailUsuario') mailUsuario: string,
  ) {
    return this.useCaseConsultarPorcentajeDeAsistenciaDePacientes.consultarPorcentajeAsistenciaPacientesHospitales(
      mailUsuario,
    );
  }
  @Get('consultarPorcentajeAsistenciaPacientes/:idHospital')
  consultarPorcentajeAsistenciaPacientes(
    @Param('idHospital') idHospital: string,
  ) {
    return this.useCaseConsultarPorcentajeDeAsistenciaDePacientes.consultarPorcentajeAsistenciaPacientes(
      Number(idHospital),
    );
  }
}
