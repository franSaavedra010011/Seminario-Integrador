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
exports.MedicoController = void 0;
const common_1 = require("@nestjs/common");
const create_medico_dto_1 = require("../../../application/use-cases/abm/medico/dto/create-medico.dto");
const update_medico_dto_1 = require("../../../application/use-cases/abm/medico/dto/update-medico.dto");
const medico_entity_1 = require("../../../domain/entities/medico.entity");
class MedicoController {
    abmMedicoUseCase;
    genericRepositoryService;
    constructor(abmMedicoUseCase, genericRepositoryService) {
        this.abmMedicoUseCase = abmMedicoUseCase;
        this.genericRepositoryService = genericRepositoryService;
    }
    async alta(createMedicoDto) {
        return this.abmMedicoUseCase.crear(createMedicoDto);
    }
    async modificar(id, updateMedicoDto) {
        return this.abmMedicoUseCase.actualizar(id, updateMedicoDto);
    }
    async baja(id) {
        return this.genericRepositoryService.eliminar(medico_entity_1.Medico, id);
    }
}
exports.MedicoController = MedicoController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medico_dto_1.CreateMedicoDto]),
    __metadata("design:returntype", Promise)
], MedicoController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_medico_dto_1.UpdateMedicoDto]),
    __metadata("design:returntype", Promise)
], MedicoController.prototype, "modificar", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MedicoController.prototype, "baja", null);
//# sourceMappingURL=medico.controller.js.map