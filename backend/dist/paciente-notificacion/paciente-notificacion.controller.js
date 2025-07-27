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
exports.PacienteNotificacionController = void 0;
const common_1 = require("@nestjs/common");
const paciente_notificacion_service_1 = require("./paciente-notificacion.service");
const create_paciente_notificacion_dto_1 = require("./dto/create-paciente-notificacion.dto");
const update_paciente_notificacion_dto_1 = require("./dto/update-paciente-notificacion.dto");
let PacienteNotificacionController = class PacienteNotificacionController {
    pacienteNotificacionService;
    constructor(pacienteNotificacionService) {
        this.pacienteNotificacionService = pacienteNotificacionService;
    }
    create(createPacienteNotificacionDto) {
        return this.pacienteNotificacionService.create(createPacienteNotificacionDto);
    }
    findAll() {
        return this.pacienteNotificacionService.findAll();
    }
    findOne(id) {
        return this.pacienteNotificacionService.findOne(+id);
    }
    update(id, updatePacienteNotificacionDto) {
        return this.pacienteNotificacionService.update(+id, updatePacienteNotificacionDto);
    }
    remove(id) {
        return this.pacienteNotificacionService.remove(+id);
    }
};
exports.PacienteNotificacionController = PacienteNotificacionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paciente_notificacion_dto_1.CreatePacienteNotificacionDto]),
    __metadata("design:returntype", void 0)
], PacienteNotificacionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PacienteNotificacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PacienteNotificacionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paciente_notificacion_dto_1.UpdatePacienteNotificacionDto]),
    __metadata("design:returntype", void 0)
], PacienteNotificacionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PacienteNotificacionController.prototype, "remove", null);
exports.PacienteNotificacionController = PacienteNotificacionController = __decorate([
    (0, common_1.Controller)('paciente-notificacion'),
    __metadata("design:paramtypes", [paciente_notificacion_service_1.PacienteNotificacionService])
], PacienteNotificacionController);
//# sourceMappingURL=paciente-notificacion.controller.js.map