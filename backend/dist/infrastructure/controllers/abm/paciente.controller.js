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
exports.PacienteController = void 0;
const common_1 = require("@nestjs/common");
const paciente_entity_1 = require("./../../../domain/entities/paciente.entity");
const create_paciente_dto_1 = require("../../../application/use-cases/abm/paciente/dto/create-paciente.dto");
const update_paciente_dto_1 = require("../../../application/use-cases/abm/paciente/dto/update-paciente.dto");
class PacienteController {
    abmPacienteUseCase;
    genericRepositoryService;
    constructor(abmPacienteUseCase, genericRepositoryService) {
        this.abmPacienteUseCase = abmPacienteUseCase;
        this.genericRepositoryService = genericRepositoryService;
    }
    async alta(dto) {
        return this.abmPacienteUseCase.crear(dto);
    }
    async modificacion(id, dto) {
        return this.abmPacienteUseCase.actualizar(id, dto);
    }
    async baja(id) {
        return this.genericRepositoryService.eliminar(paciente_entity_1.Paciente, id);
    }
}
exports.PacienteController = PacienteController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paciente_dto_1.CreatePacienteDto]),
    __metadata("design:returntype", Promise)
], PacienteController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificacion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_paciente_dto_1.UpdatePacienteDto]),
    __metadata("design:returntype", Promise)
], PacienteController.prototype, "modificacion", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PacienteController.prototype, "baja", null);
//# sourceMappingURL=paciente.controller.js.map