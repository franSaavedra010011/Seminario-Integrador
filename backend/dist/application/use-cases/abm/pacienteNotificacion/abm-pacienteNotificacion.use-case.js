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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbmPacienteNotificacionUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const paciente_notificacion_entity_1 = require("../../../../domain/entities/paciente-notificacion.entity");
let AbmPacienteNotificacionUseCase = class AbmPacienteNotificacionUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const pacienteNotificacion = new paciente_notificacion_entity_1.PacienteNotificacion();
        pacienteNotificacion.observacionPacienteNotificacion = dto.observaciones;
        pacienteNotificacion.paciente = dto.paciente;
        pacienteNotificacion.turno = dto.turno;
        return await this.genericRepository.guardarCambios(paciente_notificacion_entity_1.PacienteNotificacion, pacienteNotificacion);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(paciente_notificacion_entity_1.PacienteNotificacion, id);
    }
};
exports.AbmPacienteNotificacionUseCase = AbmPacienteNotificacionUseCase;
exports.AbmPacienteNotificacionUseCase = AbmPacienteNotificacionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmPacienteNotificacionUseCase);
//# sourceMappingURL=abm-pacienteNotificacion.use-case.js.map