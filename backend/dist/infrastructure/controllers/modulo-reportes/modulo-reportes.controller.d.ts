import { ConsultarCantidadDeTurnosAsignadosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case';
import { ConsultarHistorialDeTurnosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case';
import { ConsultarPorcentajeDeAsistenciaDePacientesUseCase } from 'src/application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case';
import { GenerarReporteAdministrativoUseCase } from 'src/application/use-cases/modulo-reportes/generar-reporte-administrativo.use-case';
export declare class ModuloDeReporteController {
    private readonly useCaseConsultarCantidadTurnosAsignados;
    private readonly useCaseConsultarHistorialTurnos;
    private readonly useCaseConsultarPorcentajeDeAsistenciaDePacientes;
    private readonly useCaseGenerarReporteAdministrativoUseCase;
    constructor(useCaseConsultarCantidadTurnosAsignados: ConsultarCantidadDeTurnosAsignadosUseCase, useCaseConsultarHistorialTurnos: ConsultarHistorialDeTurnosUseCase, useCaseConsultarPorcentajeDeAsistenciaDePacientes: ConsultarPorcentajeDeAsistenciaDePacientesUseCase, useCaseGenerarReporteAdministrativoUseCase: GenerarReporteAdministrativoUseCase);
    consultarTurnosAsignadosHospitales(emailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-cantidad-turnos-asignados-hospitales.dto").ConsultarTurnosAsignadosHospitalDTO[]>;
    consultarCantidadTurnosAsignados(idHospital: string, mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-cantidad-turnos-asignados-turnos.dto").ConsultarCantidadTurnosAsignadosTurnosDTO[]>;
    consultarHistorialTurnos(mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-turnos-historial.dto").ConsultarTurnosHistorialDTO[]>;
    consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-porcentaje-pacientes.dto").ConsultarPorcentajePacientesDTO[]>;
    consultarPorcentajeAsistenciaPacientes(idHospital: string): Promise<number>;
    generarReporteAdministrativoHospital(idHospital: string): Promise<string>;
    generarReporteAdministrativo(idHospital: string, fechaDesdeString: string, fechaHastaString: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/Generar-reporte-administrativo.dto").GenerarReporteAdministrativo>;
}
