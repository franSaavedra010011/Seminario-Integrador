import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CancelarTurnoUseCase } from 'src/application/use-cases/modulo-turnos/cancelar-turno.use-case';
import { ConsultarDetalleDelTurnoUseCase } from 'src/application/use-cases/modulo-turnos/consultar-detalle-del-turno.use-case';
import { ConsultarTurnosActivosUseCase } from 'src/application/use-cases/modulo-turnos/consultar-turnos-activos.use-case';
import { CrearAgendaSemanalUseCase } from 'src/application/use-cases/modulo-turnos/crear-agenda-semanal.use-case';
import { DiaAgendaCancelacionDTO } from 'src/application/use-cases/modulo-turnos/dto/dia-agenda-cancelacion.dto';
import { NotificarCancelacionDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-cancelacion-de-turno.use-case';
import { NotificarProximidadDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-proximidad-de-turno.use-case';
import { RegistrarAsistenciaDePacienteUseCase } from 'src/application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case';
import { SolicitarTurnoUseCase, EspecialidadResumen, LocalidadResumen } from 'src/application/use-cases/modulo-turnos/solicitar-turno.use-case';
import { VerificarAgendaVigenteUseCase } from 'src/application/use-cases/modulo-turnos/verificar-agenda-vigente.use-case';
import { Hospital } from 'src/domain/entities/hospital.entity';
import { Medico } from 'src/domain/entities/medico.entity';

@Controller('turno')
export class TurnoController {
    constructor(
        private readonly useCaseCancelarTurno: CancelarTurnoUseCase,
        private readonly useCaseConsultarDetalleTurno: ConsultarDetalleDelTurnoUseCase,
        private readonly useCaseConsultarTurnosActivos: ConsultarTurnosActivosUseCase,
        private readonly useCaseNotificarCancelacionDeTurno: NotificarCancelacionDeTurnoUseCase,
        private readonly useCaseNotificarProximidadDeTurno: NotificarProximidadDeTurnoUseCase,
        private readonly useCaseRegistrarAsistenciaDePaciente: RegistrarAsistenciaDePacienteUseCase,
        private readonly useCaseSolicitarTurno: SolicitarTurnoUseCase,
        private readonly useCaseCrearAgendaSemanal: CrearAgendaSemanalUseCase,
        private readonly useCaseVerificarAgendaVigente: VerificarAgendaVigenteUseCase,
    ) { }
    //UseCase: Cancelar Turno
    @Delete('cancelarTurno/:id')
    cancelarTurno(@Param('id') turnoSeleccionado: string) {
        console.log('entre al controlador');
        this.useCaseCancelarTurno.bajaTurno(Number(turnoSeleccionado));
    }
    //UseCase: Consultar Detaller del Turno
    @Get('consultarDetalleTurno/:id')
    consultarDetalleTurno(@Param('id') turnoSeleccionado: string) {
        return this.useCaseConsultarDetalleTurno.consultarDetalleTurno(
            Number(turnoSeleccionado),
        );
    }
    //UseCase: Consultar turnos activos
    @Get('consultarTurnosActivos/:mail')
    consultarTurnosActivos(@Param('mail') mailPaciente: string) {
        return this.useCaseConsultarTurnosActivos.consultarTurnosActivos(
            mailPaciente,
        );
    }
    //UseCase: Notificar Cancelacion de Turnos
    @Get('notificacionMuestraDeHospitales/:mail')
    notificacionMuestraDeHospitales(@Param('mail') mailUsuario: string) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeHospitales(
            mailUsuario,
        );
    }
    @Get('notificacionMuestraDeEspecialidades/:idHospital')
    notificacionMuestraDeEspecialidades(@Param('idHospital') idHospital: number) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeEspecialidades(
            Number(idHospital),
        );
    }
    @Get('notificacionMuestraDeMedicos/:idHospital/:idEspecialidad')
    notificacionMuestraDeMedicos(
        @Param('idEspecialidad') idEspecialidad: string,
        @Param('idHospital') idHospital: string,
    ) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeMedicos(
            Number(idEspecialidad),
            Number(idHospital),
        );
    }
    @Get('notificacionMuestraDeAgenda/:idHospital/:idEspecialidad/:idMedico')
    notificacionMuestraDeAgenda(
        @Param('idMedico') idMedico: string,
        @Param('idEspecialidad') idEspecialidad: string,
        @Param('idHospital') idHospital: string,
    ) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeAgenda(
            Number(idMedico),
            Number(idEspecialidad),
            Number(idHospital),
        );
    }
    @Post('notificacionCancelacionDeTurnos')
    notificacionCancelacionDeTurnos(
        @Body() dtoBajasNotificacion: DiaAgendaCancelacionDTO,
    ) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionCancelacionDeTurnos(
            dtoBajasNotificacion,
        );
    }
    //UseCase: NotificarProximidadDeTurno
    @Post('notificarProximidadDeTurno')
    notificarProximidadDeTurno() {
        return this.useCaseNotificarProximidadDeTurno.notificarProximidadDeTurno();
    }
    //UseCase: RegistrarAsistenciaDePaciente
    @Post('registrarAsistenciaDePaciente/:idTurno')
    registrarAsistenciaDePaciente(@Param('idTurno') idTurno: string) {
        return this.useCaseRegistrarAsistenciaDePaciente.registrarAsistenciaDePaciente(
            Number(idTurno),
        );
    }

    //UseCase: Solicitar Turno
    @Post('solicitarTurno/validacionDatosPaciente/:idPaciente')
    async validacionDatosPaciente(@Param('idPaciente') idPaciente: number) {
        return this.useCaseSolicitarTurno.validacionDatosPaciente(idPaciente);
    }

    @Get('solicitarTurno/mostrarLocalidadesYEspecialidades')
    async mostrarLocalidadesYEspecialidades() {
        return this.useCaseSolicitarTurno.mostrarLocalidadesYEspecialidades();
    }

    @Get('solicitarTurno/listarHospitalesConRequisitosSolicitados/:idLocalidad/:idEspecialidad')
    async listarHospitalesConRequisitosSolicitados(@Param('idLocalidad') idLocalidad: number, @Param('idEspecialidad') idEspecialidad: number) {
        return this.useCaseSolicitarTurno.listarHospitalesConRequisitosSolicitados(idLocalidad, idEspecialidad);
    }

    @Get('solicitarTurno/listarMedicosRelacionadosConHospitalYEspecialidad/:idHospital/:idHospitalEspecialidad')
    async listarMedicosRelacionadosConHospitalYEspecialidad(@Param('idHospital') idHospital: number, @Param('idHospitalEspecialidad') idHospitalEspecialidad: number) {
        return this.useCaseSolicitarTurno.listarMedicosRelacionadosConHospitalYEspecialidad(idHospital, idHospitalEspecialidad);
    }

    @Get('solicitarTurno/seleccionarAgendaSemanaProxima/:idMedico/:idHEM')
    async seleccionarAgendaSemanaProxima(
        @Param('idMedico') idMedico: number,
        @Param('idHEM') idHEM: number,
    ) {
        return this.useCaseSolicitarTurno.seleccionarAgendaSemanaProxima(idMedico, idHEM);
    }

    @Get('solicitarTurno/listarHorariosDisponiblesAgenda/:idAgendaSemanal')
    async listarHorariosDisponiblesAgenda(
        @Param('idAgendaSemanal') idAgendaSemanal: number,
    ) {
        return this.useCaseSolicitarTurno.listarHorariosDisponiblesAgenda(
            idAgendaSemanal,
        );
    }

    @Post('solicitarTurno/generarReservaTurno')
    async generarReservaTurno(
        @Body('idTurnoAgendaDia') idTurnoAgendaDia: number,
        @Body('idHospital') idHospital: number,
        @Body('idMedico') idMedico: number,
        @Body('idUsuario') idUsuario: number,
        @Body('observaciones') observaciones?: string,
    ) {
        return this.useCaseSolicitarTurno.generarReservaTurno(idTurnoAgendaDia, idHospital, idMedico, idUsuario, observaciones);
    }

    @Get('solicitarTurno/generarResumenTurno/:idTurno')
    async generarResumenTurno(
        @Param('idTurno') idTurno: number,
    ) {
        return this.useCaseSolicitarTurno.generarResumenTurno(idTurno);
    }

    @Post('crearAgendaSemanal/:idHospital/:idHem')
    async crearAgendaSemanal(
        @Param('idHospital') idHospital: number,
        @Param('idHem') idHem: number,
    ) {
        return this.useCaseCrearAgendaSemanal.ejecutar(idHospital, idHem);
    }

    @Get('verificarAgendaVigente/:idRelacion')
    async verificarAgendaVigente(@Param('idRelacion') idRelacion: number) {
        return await this.useCaseVerificarAgendaVigente.ejecutar(idRelacion);
    }
}