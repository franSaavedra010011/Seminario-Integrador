import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CancelarTurnoUseCase } from 'src/application/use-cases/modulo-turnos/cancelar-turno.use-case';
import { ConsultarDetalleDelTurnoUseCase } from 'src/application/use-cases/modulo-turnos/consultar-detalle-del-turno.use-case';
import { ConsultarTurnosActivosUseCase } from 'src/application/use-cases/modulo-turnos/consultar-turnos-activos.use-case';
import { CrearAgendaSemanalUseCase } from 'src/application/use-cases/modulo-turnos/crear-agenda-semanal.use-case';
import { DiaAgendaCancelacionDTO } from 'src/application/use-cases/modulo-turnos/dto/dia-agenda-cancelacion.dto';
import { ReservaTurnoDto } from 'src/application/use-cases/modulo-turnos/dto/reserva-turno.dto';
import { NotificarCancelacionDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-cancelacion-de-turno.use-case';
import { NotificarProximidadDeTurnoUseCase } from 'src/application/use-cases/modulo-turnos/notificar-proximidad-de-turno.use-case';
import { RegistrarAsistenciaDePacienteUseCase } from 'src/application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case';
import { SolicitarTurnoUseCase } from 'src/application/use-cases/modulo-turnos/solicitar-turno.use-case';
import { VerificarAgendaVigenteUseCase } from 'src/application/use-cases/modulo-turnos/verificar-agenda-vigente.use-case';

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

    @Get('solicitarTurnoHospitales/:idEspecialidad/:idLocalidad')
    solicitarTurnoHospitales(
        @Param('idEspecialidad') idEspecialidad: string,
        @Param('idLocalidad') idLocalidad: string,
    ) {
        return this.useCaseSolicitarTurno.solicitarTurnoHospitales(
            Number(idEspecialidad),
            Number(idLocalidad),
        );
    }

    @Get('solicitarTurnoMedicos/:idEspecialidad/:idHospital')
    solicitarTurnoMedicos(
        @Param('idEspecialidad') idEspecialidad: string,
        @Param('idHospital') idHospital: string,
    ) {
        return this.useCaseSolicitarTurno.solicitarTurnoMedicos(
            Number(idEspecialidad),
            Number(idHospital),
        );
    }

    @Get('solicitarTurnoAgendas/:idMedico/:idHospital')
    solicitarTurnoAgendas(
        @Param('idMedico') idMedico: string,
        @Param('idHospital') idHospital: string,
    ) {
        return this.useCaseSolicitarTurno.solicitarTurnoAgendas(
            Number(idMedico),
            Number(idHospital),
        );
    }

    @Post(
        'solicitarTurnoFinalizar/:idMedico/:idHospital/:idAgendaSemanal/:idAgendaDia/:idTurnoAgendaDia/:idEspecialidad/:emailUsuario',
    )
    solicitarTurnoFinalizar(@Body() dto: ReservaTurnoDto) {
        this.useCaseSolicitarTurno.solicitarTurnoFinalizar(dto);
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