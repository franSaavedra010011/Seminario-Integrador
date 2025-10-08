import { ConsultarCantidadDeTurnosAsignadosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case';
import { ConsultarHistorialDeTurnosUseCase } from 'src/application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case';
import { ConsultarPorcentajeDeAsistenciaDePacientesUseCase } from 'src/application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case';
export declare class ModuloDeReporteController {
    private readonly useCaseConsultarCantidadTurnosAsignados;
    private readonly useCaseConsultarHistorialTurnos;
    private readonly useCaseConsultarPorcentajeDeAsistenciaDePacientes;
    constructor(useCaseConsultarCantidadTurnosAsignados: ConsultarCantidadDeTurnosAsignadosUseCase, useCaseConsultarHistorialTurnos: ConsultarHistorialDeTurnosUseCase, useCaseConsultarPorcentajeDeAsistenciaDePacientes: ConsultarPorcentajeDeAsistenciaDePacientesUseCase);
    consultarTurnosAsignadosHospitales(emailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-cantidad-turnos-asignados-hospitales.dto").ConsultarTurnosAsignadosHospitalDTO[]>;
    consultarCantidadTurnosAsignados(idHospital: string, mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-cantidad-turnos-asignados-turnos.dto").ConsultarCantidadTurnosAsignadosTurnosDTO[]>;
    consultarHistorialTurnos(mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-turnos-historial.dto").ConsultarTurnosHistorialDTO[]>;
    consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario: string): Promise<import("../../../application/use-cases/modulo-reportes/dto/consultar-porcentaje-pacientes.dto").ConsultarPorcentajePacientesDTO[]>;
    consultarPorcentajeAsistenciaPacientes(idHospital: string): Promise<number>;
}
