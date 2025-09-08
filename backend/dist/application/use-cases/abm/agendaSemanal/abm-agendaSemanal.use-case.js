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
exports.AbmAgendaSemanalUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const agenda_semanal_entity_1 = require("../../../../domain/entities/agenda-semanal.entity");
let AbmAgendaSemanalUseCase = class AbmAgendaSemanalUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(agenda_semanal_entity_1.AgendaSemanal, id);
    }
};
exports.AbmAgendaSemanalUseCase = AbmAgendaSemanalUseCase;
exports.AbmAgendaSemanalUseCase = AbmAgendaSemanalUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmAgendaSemanalUseCase);
//# sourceMappingURL=abm-agendaSemanal.use-case.js.map