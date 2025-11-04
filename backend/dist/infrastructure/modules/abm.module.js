"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agenda_dia_entity_1 = require("../../domain/entities/agenda-dia.entity");
const agenda_semanal_entity_1 = require("../../domain/entities/agenda-semanal.entity");
const congestion_actual_entity_1 = require("../../domain/entities/congestion-actual.entity");
const congestion_historico_entity_1 = require("../../domain/entities/congestion-historico.entity");
const especialidad_medico_entity_1 = require("../../domain/entities/especialidad-medico.entity");
const especialidad_entity_1 = require("../../domain/entities/especialidad.entity");
const estado_turno_entity_1 = require("../../domain/entities/estado-turno.entity");
const historia_medica_entity_1 = require("../../domain/entities/historia-medica.entity");
const hospital_especialidad_medico_entity_1 = require("../../domain/entities/hospital-especialidad-medico.entity");
const hospital_especialidad_entity_1 = require("../../domain/entities/hospital-especialidad.entity");
const hospital_entity_1 = require("../../domain/entities/hospital.entity");
const localidad_entity_1 = require("../../domain/entities/localidad.entity");
const medico_entity_1 = require("../../domain/entities/medico.entity");
const paciente_notificacion_entity_1 = require("../../domain/entities/paciente-notificacion.entity");
const paciente_entity_1 = require("../../domain/entities/paciente.entity");
const permiso_entity_1 = require("../../domain/entities/permiso.entity");
const personal_hospital_entity_1 = require("../../domain/entities/personal-hospital.entity");
const rol_permiso_entity_1 = require("../../domain/entities/rol-permiso.entity");
const rol_entity_1 = require("../../domain/entities/rol.entity");
const turno_agenda_dia_entity_1 = require("../../domain/entities/turno-agenda-dia.entity");
const turno_estado_entity_1 = require("../../domain/entities/turno-estado.entity");
const turno_entity_1 = require("../../domain/entities/turno.entity");
const usuario_rol_entity_1 = require("../../domain/entities/usuario-rol.entity");
const usuario_entity_1 = require("../../domain/entities/usuario.entity");
const abm_usuario_use_case_1 = require("../../application/use-cases/abm/usuario/abm-usuario.use-case");
const abm_rol_use_case_1 = require("../../application/use-cases/abm/rol/abm-rol.use-case");
const abm_permiso_use_case_1 = require("../../application/use-cases/abm/permiso/abm-permiso.use-case");
const abm_paciente_use_case_1 = require("../../application/use-cases/abm/paciente/abm-paciente.use-case");
const abm_medico_use_case_1 = require("../../application/use-cases/abm/medico/abm-medico.use-case");
const abm_hospital_use_case_1 = require("../../application/use-cases/abm/hospital/abm-hospital.use-case");
const abm_especialidad_use_case_1 = require("../../application/use-cases/abm/especialidad/abm-especialidad.use-case");
const abm_estado_turno_use_case_1 = require("../../application/use-cases/abm/estado-turno/abm-estado-turno.use-case");
const genericRepository_service_1 = require("../../shared/utils/genericRepository.service");
const permiso_controller_1 = require("../controllers/abm/permiso.controller");
const especialidad_controller_1 = require("../controllers/abm/especialidad.controller");
const abm_turno_use_case_1 = require("../../application/use-cases/abm/turno/abm-turno.use-case");
const cancelar_turno_use_case_1 = require("../../application/use-cases/modulo-turnos/cancelar-turno.use-case");
const modulo_turnos_controller_1 = require("../controllers/modulo-turnos/modulo-turnos.controller");
const consultar_detalle_del_turno_use_case_1 = require("../../application/use-cases/modulo-turnos/consultar-detalle-del-turno.use-case");
const consultar_turnos_activos_use_case_1 = require("../../application/use-cases/modulo-turnos/consultar-turnos-activos.use-case");
const notificar_cancelacion_de_turno_use_case_1 = require("../../application/use-cases/modulo-turnos/notificar-cancelacion-de-turno.use-case");
const abm_agendaSemanal_use_case_1 = require("../../application/use-cases/abm/agendaSemanal/abm-agendaSemanal.use-case");
const abm_agendaDia_use_case_1 = require("../../application/use-cases/abm/agendaDia/abm-agendaDia.use-case");
const abm_pacienteNotificacion_use_case_1 = require("../../application/use-cases/abm/pacienteNotificacion/abm-pacienteNotificacion.use-case");
const abm_turno_agenda_dia_use_case_1 = require("../../application/use-cases/abm/turno-agenda-dia/abm-turno-agenda-dia.use-case");
const notificar_proximidad_de_turno_use_case_1 = require("../../application/use-cases/modulo-turnos/notificar-proximidad-de-turno.use-case");
const registrar_asistencia_de_paciente_use_case_1 = require("../../application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case");
const abm_turno_estado_use_case_1 = require("../../application/use-cases/abm/turnoEstado/abm-turno-estado.use-case");
const solicitar_turno_use_case_1 = require("../../application/use-cases/modulo-turnos/solicitar-turno.use-case");
const modulo_reportes_controller_1 = require("../controllers/modulo-reportes/modulo-reportes.controller");
const consultar_cantidad_de_turnos_asignados_use_case_1 = require("../../application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case");
const consultar_historial_de_turnos_use_case_1 = require("../../application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case");
const consultar_porcentaje_de_asistencia_de_pacientes_use_case_1 = require("../../application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case");
const generar_reporte_administrativo_use_case_1 = require("../../application/use-cases/modulo-reportes/generar-reporte-administrativo.use-case");
let AbmModule = class AbmModule {
};
exports.AbmModule = AbmModule;
exports.AbmModule = AbmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                agenda_dia_entity_1.AgendaDia,
                agenda_semanal_entity_1.AgendaSemanal,
                congestion_actual_entity_1.CongestionActual,
                congestion_historico_entity_1.CongestionHistorico,
                especialidad_medico_entity_1.EspecialidadMedico,
                especialidad_entity_1.Especialidad,
                estado_turno_entity_1.EstadoTurno,
                historia_medica_entity_1.HistoriaMedica,
                hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico,
                hospital_especialidad_entity_1.HospitalEspecialidad,
                hospital_entity_1.Hospital,
                localidad_entity_1.Localidad,
                medico_entity_1.Medico,
                paciente_notificacion_entity_1.PacienteNotificacion,
                paciente_entity_1.Paciente,
                permiso_entity_1.Permiso,
                personal_hospital_entity_1.PersonalHospital,
                rol_permiso_entity_1.RolPermiso,
                rol_entity_1.Rol,
                turno_agenda_dia_entity_1.TurnoAgendaDia,
                turno_estado_entity_1.TurnoEstado,
                turno_entity_1.Turno,
                usuario_rol_entity_1.UsuarioRol,
                usuario_entity_1.Usuario,
            ]),
        ],
        controllers: [
            permiso_controller_1.PermisoController,
            especialidad_controller_1.EspecialidadController,
            modulo_turnos_controller_1.ModuloDeTurnoController,
            modulo_reportes_controller_1.ModuloDeReporteController,
        ],
        providers: [
            genericRepository_service_1.GenericRepositoryService,
            abm_usuario_use_case_1.AbmUsuarioUseCase,
            abm_rol_use_case_1.AbmRolUseCase,
            abm_permiso_use_case_1.AbmPermisoUseCase,
            abm_paciente_use_case_1.AbmPacienteUseCase,
            abm_medico_use_case_1.AbmMedicoUseCase,
            abm_hospital_use_case_1.AbmHospitalUseCase,
            abm_especialidad_use_case_1.AbmEspecialidadUseCase,
            abm_estado_turno_use_case_1.AbmEstadoTurnoUseCase,
            abm_turno_use_case_1.AbmTurnoUseCase,
            abm_agendaSemanal_use_case_1.AbmAgendaSemanalUseCase,
            abm_agendaDia_use_case_1.AbmAgendaDiaUseCase,
            abm_pacienteNotificacion_use_case_1.AbmPacienteNotificacionUseCase,
            abm_turno_agenda_dia_use_case_1.AbmTurnoAgendaDiaUseCase,
            abm_turno_estado_use_case_1.AbmTurnoEstadoUseCase,
            cancelar_turno_use_case_1.CancelarTurnoUseCase,
            consultar_detalle_del_turno_use_case_1.ConsultarDetalleDelTurnoUseCase,
            consultar_turnos_activos_use_case_1.ConsultarTurnosActivosUseCase,
            notificar_cancelacion_de_turno_use_case_1.NotificarCancelacionDeTurnoUseCase,
            notificar_proximidad_de_turno_use_case_1.NotificarProximidadDeTurnoUseCase,
            registrar_asistencia_de_paciente_use_case_1.RegistrarAsistenciaDePacienteUseCase,
            solicitar_turno_use_case_1.SolicitarTurnoUseCase,
            consultar_cantidad_de_turnos_asignados_use_case_1.ConsultarCantidadDeTurnosAsignadosUseCase,
            consultar_historial_de_turnos_use_case_1.ConsultarHistorialDeTurnosUseCase,
            consultar_porcentaje_de_asistencia_de_pacientes_use_case_1.ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
            generar_reporte_administrativo_use_case_1.GenerarReporteAdministrativoUseCase,
        ],
        exports: [
            abm_usuario_use_case_1.AbmUsuarioUseCase,
            abm_rol_use_case_1.AbmRolUseCase,
            abm_permiso_use_case_1.AbmPermisoUseCase,
            abm_paciente_use_case_1.AbmPacienteUseCase,
            abm_medico_use_case_1.AbmMedicoUseCase,
            abm_hospital_use_case_1.AbmHospitalUseCase,
            abm_especialidad_use_case_1.AbmEspecialidadUseCase,
            abm_estado_turno_use_case_1.AbmEstadoTurnoUseCase,
            abm_turno_use_case_1.AbmTurnoUseCase,
            abm_agendaSemanal_use_case_1.AbmAgendaSemanalUseCase,
            abm_agendaDia_use_case_1.AbmAgendaDiaUseCase,
            abm_pacienteNotificacion_use_case_1.AbmPacienteNotificacionUseCase,
            abm_turno_agenda_dia_use_case_1.AbmTurnoAgendaDiaUseCase,
            abm_turno_estado_use_case_1.AbmTurnoEstadoUseCase,
            cancelar_turno_use_case_1.CancelarTurnoUseCase,
            consultar_detalle_del_turno_use_case_1.ConsultarDetalleDelTurnoUseCase,
            consultar_turnos_activos_use_case_1.ConsultarTurnosActivosUseCase,
            notificar_cancelacion_de_turno_use_case_1.NotificarCancelacionDeTurnoUseCase,
            notificar_proximidad_de_turno_use_case_1.NotificarProximidadDeTurnoUseCase,
            registrar_asistencia_de_paciente_use_case_1.RegistrarAsistenciaDePacienteUseCase,
            solicitar_turno_use_case_1.SolicitarTurnoUseCase,
            consultar_cantidad_de_turnos_asignados_use_case_1.ConsultarCantidadDeTurnosAsignadosUseCase,
            consultar_historial_de_turnos_use_case_1.ConsultarHistorialDeTurnosUseCase,
            consultar_porcentaje_de_asistencia_de_pacientes_use_case_1.ConsultarPorcentajeDeAsistenciaDePacientesUseCase,
            generar_reporte_administrativo_use_case_1.GenerarReporteAdministrativoUseCase,
        ],
    })
], AbmModule);
//# sourceMappingURL=abm.module.js.map