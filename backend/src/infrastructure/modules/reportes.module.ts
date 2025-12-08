import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstadoTurno } from "src/domain/entities/estado-turno.entity";
import { Hospital } from "src/domain/entities/hospital.entity";
import { Medico } from "src/domain/entities/medico.entity";
import { Paciente } from "src/domain/entities/paciente.entity";
import { Turno } from "src/domain/entities/turno.entity";
import { ReportesController } from "../controllers/reportes.controller";
import { ConsultarPorcentajeDeAsistenciaDePacientesUseCase } from "src/application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case";
import { ConsultarHistorialDeTurnosUseCase } from "src/application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case";
import { ConsultarCantidadDeTurnosAsignadosUseCase } from "src/application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case";
import { SharedModule } from "./shared.module";
import { GenerarReportePacienteUseCase } from "src/application/use-cases/modulo-reportes/generar-reporte-de-paciente.use-case";
import { GenerarReporteAdministrativoUseCase } from "src/application/use-cases/modulo-reportes/generar-reporte-administrativo.use-case";
import { GenerarReporteMedicoUseCase } from "src/application/use-cases/modulo-reportes/generar-reporte-de-medico.use-case";
import { Usuario } from "src/domain/entities/usuario.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Usuario,
            Paciente,
            Medico,
            Turno,
            Hospital,
            EstadoTurno,
        ]),
        SharedModule,
    ],
    controllers: [
        ReportesController
    ],
    providers: [
        GenerarReporteAdministrativoUseCase,
        GenerarReportePacienteUseCase,
        GenerarReporteMedicoUseCase,
        ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
        ConsultarHistorialDeTurnosUseCase,
        ConsultarCantidadDeTurnosAsignadosUseCase,
    ],
    exports: [
        GenerarReporteAdministrativoUseCase,
        GenerarReportePacienteUseCase,
        GenerarReporteMedicoUseCase,
        ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
        ConsultarHistorialDeTurnosUseCase,
        ConsultarCantidadDeTurnosAsignadosUseCase,
    ],
})
export class ReportesModule { }