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
exports.ModuloDeReporteController = void 0;
const common_1 = require("@nestjs/common");
const consultar_cantidad_de_turnos_asignados_use_case_1 = require("../../../application/use-cases/modulo-reportes/consultar-cantidad-de-turnos-asignados.use-case");
const consultar_historial_de_turnos_use_case_1 = require("../../../application/use-cases/modulo-reportes/consultar-historial-de-turnos.use-case");
const consultar_porcentaje_de_asistencia_de_pacientes_use_case_1 = require("../../../application/use-cases/modulo-reportes/consultar-porcentaje-de-asistencia-de-pacientes.use-case");
let ModuloDeReporteController = class ModuloDeReporteController {
    useCaseConsultarCantidadTurnosAsignados;
    useCaseConsultarHistorialTurnos;
    useCaseConsultarPorcentajeDeAsistenciaDePacientes;
    constructor(useCaseConsultarCantidadTurnosAsignados, useCaseConsultarHistorialTurnos, useCaseConsultarPorcentajeDeAsistenciaDePacientes) {
        this.useCaseConsultarCantidadTurnosAsignados = useCaseConsultarCantidadTurnosAsignados;
        this.useCaseConsultarHistorialTurnos = useCaseConsultarHistorialTurnos;
        this.useCaseConsultarPorcentajeDeAsistenciaDePacientes = useCaseConsultarPorcentajeDeAsistenciaDePacientes;
    }
    consultarTurnosAsignadosHospitales(emailUsuario) {
        return this.useCaseConsultarCantidadTurnosAsignados.consultarTurnosAsignadosHospitales(emailUsuario);
    }
    consultarCantidadTurnosAsignados(idHospital, mailUsuario) {
        return this.useCaseConsultarCantidadTurnosAsignados.consultarCantidadTurnosAsignados(Number(idHospital), mailUsuario);
    }
    consultarHistorialTurnos(mailUsuario) {
        return this.useCaseConsultarHistorialTurnos.consultarHistorialTurnos(mailUsuario);
    }
    consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario) {
        return this.useCaseConsultarPorcentajeDeAsistenciaDePacientes.consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario);
    }
    consultarPorcentajeAsistenciaPacientes(idHospital) {
        return this.useCaseConsultarPorcentajeDeAsistenciaDePacientes.consultarPorcentajeAsistenciaPacientes(Number(idHospital));
    }
};
exports.ModuloDeReporteController = ModuloDeReporteController;
__decorate([
    (0, common_1.Get)('consultarTurnosAsignadosHospitales/:emailUsuario'),
    __param(0, (0, common_1.Param)('emailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeReporteController.prototype, "consultarTurnosAsignadosHospitales", null);
__decorate([
    (0, common_1.Get)('consultarCantidadTurnosAsignados/:mailUsuario/:idHospital'),
    __param(0, (0, common_1.Param)('idHospital')),
    __param(1, (0, common_1.Param)('mailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ModuloDeReporteController.prototype, "consultarCantidadTurnosAsignados", null);
__decorate([
    (0, common_1.Get)('consultarHistorialTurnos/:mailUsuario'),
    __param(0, (0, common_1.Param)('mailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeReporteController.prototype, "consultarHistorialTurnos", null);
__decorate([
    (0, common_1.Get)('consultarPorcentajeAsistenciaPacientesHospital/:mailUsuario'),
    __param(0, (0, common_1.Param)('mailUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeReporteController.prototype, "consultarPorcentajeAsistenciaPacientesHospitales", null);
__decorate([
    (0, common_1.Get)('consultarPorcentajeAsistenciaPacientes/:idHospital'),
    __param(0, (0, common_1.Param)('idHospital')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuloDeReporteController.prototype, "consultarPorcentajeAsistenciaPacientes", null);
exports.ModuloDeReporteController = ModuloDeReporteController = __decorate([
    (0, common_1.Controller)('moduloReportes'),
    __metadata("design:paramtypes", [consultar_cantidad_de_turnos_asignados_use_case_1.ConsultarCantidadDeTurnosAsignadosUseCase,
        consultar_historial_de_turnos_use_case_1.ConsultarHistorialDeTurnosUseCase,
        consultar_porcentaje_de_asistencia_de_pacientes_use_case_1.ConsultarPorcentajeDeAsistenciaDePacientesUseCase])
], ModuloDeReporteController);
//# sourceMappingURL=modulo-reportes.controller.js.map