"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuloDeTurnoController = void 0;
const common_1 = require("@nestjs/common");
const cancelar_turno_use_case_1 = require("../../../application/use-cases/modulo-turnos/cancelar-turno.use-case");
const consultar_detalle_del_turno_use_case_1 = require("../../../application/use-cases/modulo-turnos/consultar-detalle-del-turno.use-case");
const consultar_turnos_activos_use_case_1 = require("../../../application/use-cases/modulo-turnos/consultar-turnos-activos.use-case");
const dia_agenda_cancelacion_dto_1 = require("../../../application/use-cases/modulo-turnos/dto/dia-agenda-cancelacion.dto");
const notificar_cancelacion_de_turno_use_case_1 = require("../../../application/use-cases/modulo-turnos/notificar-cancelacion-de-turno.use-case");
const notificar_proximidad_de_turno_use_case_1 = require("../../../application/use-cases/modulo-turnos/notificar-proximidad-de-turno.use-case");
const registrar_asistencia_de_paciente_use_case_1 = require("../../../application/use-cases/modulo-turnos/registrar-asistencia-de-paciente.use-case");
const solicitar_turno_use_case_1 = require("../../../application/use-cases/modulo-turnos/solicitar-turno.use-case");
let ModuloDeTurnoController = class ModuloDeTurnoController {
    useCaseCancelarTurno;
    useCaseConsultarDetalleTurno;
    useCaseConsultarTurnosActivos;
    useCaseNotificarCancelacionDeTurno;
    useCaseNotificarProximidadDeTurno;
    useCaseRegistrarAsistenciaDePaciente;
    useCaseSolicitarTurno;
    constructor(useCaseCancelarTurno, useCaseConsultarDetalleTurno, useCaseConsultarTurnosActivos, useCaseNotificarCancelacionDeTurno, useCaseNotificarProximidadDeTurno, useCaseRegistrarAsistenciaDePaciente, useCaseSolicitarTurno) {
        this.useCaseCancelarTurno = useCaseCancelarTurno;
        this.useCaseConsultarDetalleTurno = useCaseConsultarDetalleTurno;
        this.useCaseConsultarTurnosActivos = useCaseConsultarTurnosActivos;
        this.useCaseNotificarCancelacionDeTurno = useCaseNotificarCancelacionDeTurno;
        this.useCaseNotificarProximidadDeTurno = useCaseNotificarProximidadDeTurno;
        this.useCaseRegistrarAsistenciaDePaciente = useCaseRegistrarAsistenciaDePaciente;
        this.useCaseSolicitarTurno = useCaseSolicitarTurno;
    }
    cancelarTurno(turnoSeleccionado) {
        console.log('entre al controlador');
        this.useCaseCancelarTurno.bajaTurno(Number(turnoSeleccionado));
    }
    consultarDetalleTurno(turnoSeleccionado) {
        return this.useCaseConsultarDetalleTurno.consultarDetalleTurno(Number(turnoSeleccionado));
    }
    consultarTurnosActivos(mailPaciente) {
        return this.useCaseConsultarTurnosActivos.consultarTurnosActivos(mailPaciente);
    }
    notificacionMuestraDeHospitales(mailUsuario) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeHospitales(mailUsuario);
    }
    notificacionMuestraDeEspecialidades(idHospital) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeEspecialidades(Number(idHospital));
    }
    notificacionMuestraDeMedicos(idEspecialidad, idHospital) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeMedicos(Number(idEspecialidad), Number(idHospital));
    }
    notificacionMuestraDeAgenda(idMedico, idEspecialidad, idHospital) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionMuestraDeAgenda(Number(idMedico), Number(idEspecialidad), Number(idHospital));
    }
    notificacionCancelacionDeTurnos(dtoBajasNotificacion) {
        return this.useCaseNotificarCancelacionDeTurno.notificacionCancelacionDeTurnos(dtoBajasNotificacion);
    }
    notificarProximidadDeTurno() {
        return this.useCaseNotificarProximidadDeTurno.notificarProximidadDeTurno();
    }
    registrarAsistenciaDePaciente(idTurno) {
        return this.useCaseRegistrarAsistenciaDePaciente.registrarAsistenciaDePaciente(Number(idTurno));
    }
    solicitarTurnoEspecialidades() {
        return this.useCaseSolicitarTurno.solicitarTurnoEspecialidades();
    }
    solicitarTurnoLocalidades(idEspecialidad) {
        return this.useCaseSolicitarTurno.solicitarTurnoLocalidades(Number(idEspecialidad));
    }
    solicitarTurnoHospitales(idEspecialidad, idLocalidad) {
        return this.useCaseSolicitarTurno.solicitarTurnoHospitales(Number(idEspecialidad), Number(idLocalidad));
    }
    solicitarTurnoMedicos(idEspecialidad, idHospital) {
        return this.useCaseSolicitarTurno.solicitarTurnoMedicos(Number(idEspecialidad), Number(idHospital));
    }
    solicitarTurnoAgendas(idMedico, idHospital) {
        return this.useCaseSolicitarTurno.solicitarTurnoAgendas(Number(idMedico), Number(idHospital));
    }
    solicitarTurnoResumen(idMedico, idHospital, idTurnoAgendaDia, idAgendaSemanal, idAgendaDia, idEspecialidad, emailUsuario) {
        return this.useCaseSolicitarTurno.solicitarTurnoResumen(Number(idMedico), Number(idHospital), Number(idAgendaSemanal), Number(idAgendaDia), Number(idTurnoAgendaDia), Number(idEspecialidad), emailUsuario);
    }
    solicitarTurnoFinalizar(idMedico, idHospital, idTurnoAgendaDia, idAgendaSemanal, idAgendaDia, idEspecialidad, emailUsuario) {
        this.useCaseSolicitarTurno.solicitarTurnoFinalizar(Number(idMedico), Number(idHospital), Number(idAgendaSemanal), Number(idAgendaDia), Number(idTurnoAgendaDia), Number(idEspecialidad), emailUsuario);
    }
};
exports.ModuloDeTurnoController = ModuloDeTurnoController;
__decorate([
    (0, common_1.Delete)('cancelarTurno/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "cancelarTurno", null);
__decorate([
    (0, common_1.Get)('consultarDetalleTurno/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "consultarDetalleTurno", null);
__decorate([
    (0, common_1.Get)('consultarTurnosActivos/:mail'),
    __param(0, (0, common_1.Param)('mail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "consultarTurnosActivos", null);
__decorate([
    (0, common_1.Get)('notificacionMuestraDeHospitales/:mail'),
    __param(0, (0, common_1.Param)('mail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificacionMuestraDeHospitales", null);
__decorate([
    (0, common_1.Get)('notificacionMuestraDeEspecialidades/:idHospital'),
    __param(0, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificacionMuestraDeEspecialidades", null);
__decorate([
    (0, common_1.Get)('notificacionMuestraDeMedicos/:idHospital/:idEspecialidad'),
    __param(0, (0, common_1.Param)('idEspecialidad')),
    __param(1, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificacionMuestraDeMedicos", null);
__decorate([
    (0, common_1.Get)('notificacionMuestraDeAgenda/:idHospital/:idEspecialidad/:idMedico'),
    __param(0, (0, common_1.Param)('idMedico')),
    __param(1, (0, common_1.Param)('idEspecialidad')),
    __param(2, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificacionMuestraDeAgenda", null);
__decorate([
    (0, common_1.Post)('notificacionCancelacionDeTurnos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dia_agenda_cancelacion_dto_1.DiaAgendaCancelacionDTO]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificacionCancelacionDeTurnos", null);
__decorate([
    (0, common_1.Post)('notificarProximidadDeTurno'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "notificarProximidadDeTurno", null);
__decorate([
    (0, common_1.Post)('registrarAsistenciaDePaciente/:idTurno'),
    __param(0, (0, common_1.Param)('idTurno')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "registrarAsistenciaDePaciente", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoEspecialidades'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoEspecialidades", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoLocalidades/:idEspecialidad'),
    __param(0, (0, common_1.Param)('idEspecialidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoLocalidades", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoHospitales/:idEspecialidad/:idLocalidad'),
    __param(0, (0, common_1.Param)('idEspecialidad')),
    __param(1, (0, common_1.Param)('idLocalidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoHospitales", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoMedicos/:idEspecialidad/:idHospital'),
    __param(0, (0, common_1.Param)('idEspecialidad')),
    __param(1, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoMedicos", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoAgendas/:idMedico/:idHospital'),
    __param(0, (0, common_1.Param)('idMedico')),
    __param(1, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoAgendas", null);
__decorate([
    (0, common_1.Get)('solicitarTurnoResumen/:idMedico/:idHospital/:idAgendaSemanal/:idAgendaDia/:idTurnoAgendaDia/:idEspecialidad/:emailUsuario'),
    __param(0, (0, common_1.Param)('idMedico')),
    __param(1, (0, common_1.Param)('idHospital')),
    __param(2, (0, common_1.Param)('idTurnoAgendaDia')),
    __param(3, (0, common_1.Param)('idAgendaSemanal')),
    __param(4, (0, common_1.Param)('idAgendaDia')),
    __param(5, (0, common_1.Param)('idEspecialidad')),
    __param(6, (0, common_1.Param)('emailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoResumen", null);
__decorate([
    (0, common_1.Post)('solicitarTurnoFinalizar/:idMedico/:idHospital/:idAgendaSemanal/:idAgendaDia/:idTurnoAgendaDia/:idEspecialidad/:emailUsuario'),
    __param(0, (0, common_1.Param)('idMedico')),
    __param(1, (0, common_1.Param)('idHospital')),
    __param(2, (0, common_1.Param)('idTurnoAgendaDia')),
    __param(3, (0, common_1.Param)('idAgendaSemanal')),
    __param(4, (0, common_1.Param)('idAgendaDia')),
    __param(5, (0, common_1.Param)('idEspecialidad')),
    __param(6, (0, common_1.Param)('emailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeTurnoController.prototype, "solicitarTurnoFinalizar", null);
exports.ModuloDeTurnoController = ModuloDeTurnoController = __decorate([
    (0, common_1.Controller)('moduloTurnos'),
    __metadata("design:paramtypes", [cancelar_turno_use_case_1.CancelarTurnoUseCase,
        consultar_detalle_del_turno_use_case_1.ConsultarDetalleDelTurnoUseCase,
        consultar_turnos_activos_use_case_1.ConsultarTurnosActivosUseCase,
        notificar_cancelacion_de_turno_use_case_1.NotificarCancelacionDeTurnoUseCase,
        notificar_proximidad_de_turno_use_case_1.NotificarProximidadDeTurnoUseCase,
        registrar_asistencia_de_paciente_use_case_1.RegistrarAsistenciaDePacienteUseCase,
        solicitar_turno_use_case_1.SolicitarTurnoUseCase])
], ModuloDeTurnoController);
//# sourceMappingURL=modulo-turnos.controller.js.map