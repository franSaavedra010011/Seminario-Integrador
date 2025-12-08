import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { ConsultarCantidadDeTurnosAsignadosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case';
import { ConsultarHistorialDeTurnosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case';
import { ConsultarPorcentajeDeAsistenciaDePacientesUseCase } from 'src/application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case';
import { GenerarReporteAdministrativoUseCase } from 'src/application/use-cases/modulo-reportes/generar-reporte-administrativo.use-case';
import { GenerarReporteMedicoUseCase } from 'src/application/use-cases/modulo-reportes/generar-reporte-de-medico.use-case';
import { GenerarReportePacienteUseCase } from 'src/application/use-cases/modulo-reportes/generar-reporte-de-paciente.use-case';

@Controller('reportes')
export class ReportesController {
    constructor(
        private readonly useCaseConsultarCantidadTurnosAsignados: ConsultarCantidadDeTurnosAsignadosUseCase,
        private readonly useCaseConsultarHistorialTurnos: ConsultarHistorialDeTurnosUseCase,
        private readonly useCaseConsultarPorcentajeDeAsistenciaDePacientes: ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
        private readonly useCaseGenerarReporteAdministrativo: GenerarReporteAdministrativoUseCase,
        private readonly useCaseGenerarReporteMedico: GenerarReporteMedicoUseCase,
        private readonly useCaseGenerarReportePaciente: GenerarReportePacienteUseCase,
    ) { }
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
    @Get('generarReporteAdministrativoHospital/:idHospital')
    generarReporteAdministrativoHospital(
        @Param('idHospital') idHospital: string,
    ) {
        return this.useCaseGenerarReporteAdministrativo.generarReporteAdministrativoHospital(
            Number(idHospital),
        );
    }
    @Get('generarReporteAdministrativo/:idHospital/:fechaDesde/:fechaHasta')
    generarReporteAdministrativo(
        @Param('idHospital') idHospital: string,
        @Param('fechaDesde') fechaDesdeString: string,
        @Param('fechaHasta') fechaHastaString: string,
    ) {
        const fechaDesde = new Date(fechaDesdeString);
        const fechaHasta = new Date(fechaHastaString);

        // Opcional pero recomendado: Verificación básica
        if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
            throw new BadRequestException(
                'Formato de fecha inválido. Utilice un formato reconocido (ej. YYYY-MM-DD).',
            );
        }
        return this.useCaseGenerarReporteAdministrativo.generarReporteAdministrativo(
            Number(idHospital),
            fechaDesde,
            fechaHasta,
        );
    }
    @Get('generarReporteMedico/:idMedico/:fechaDesde/:fechaHasta')
    generarReporteMedico(
        @Param('idMedico') idMedico: string,
        @Param('fechaDesde') fechaDesdeString: string,
        @Param('fechaHasta') fechaHastaString: string,
    ) {
        const fechaDesde = new Date(fechaDesdeString);
        const fechaHasta = new Date(fechaHastaString);
        if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
            throw new BadRequestException(
                'Formato de fecha inválido. Utilice un formato reconocido (ej. YYYY-MM-DD).',
            );
        }
        return this.useCaseGenerarReporteMedico.generarReporteMedico(
            Number(idMedico),
            fechaDesde,
            fechaHasta,
        );
    }

    @Get('generarReportePaciente/:idUsuario/:fechaDesde/:fechaHasta')
    generarReportePaciente(
        @Param('idUsuario') idUsuario: number,
        @Param('fechaDesde') fechaDesdeString: string,
        @Param('fechaHasta') fechaHastaString: string,
    ) {
        const fechaDesde = new Date(fechaDesdeString);
        const fechaHasta = new Date(fechaHastaString);
        if (isNaN(fechaDesde.getTime()) || isNaN(fechaHasta.getTime())) {
            throw new BadRequestException(
                'Formato de fecha inválido. Utilice un formato reconocido (ej. YYYY-MM-DD).',
            );
        }
        return this.useCaseGenerarReportePaciente.generarReportePaciente(
            idUsuario,
            fechaDesde,
            fechaHasta,
        );
    }
}
