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
exports.EstadoTurnoController = void 0;
const common_1 = require("@nestjs/common");
const abm_estado_turno_use_case_1 = require("../../../application/use-cases/abm/estado-turno/abm-estado-turno.use-case");
const create_estado_turno_dto_1 = require("../../../application/use-cases/abm/estado-turno/dto/create-estado-turno.dto");
const update_estado_turno_dto_1 = require("../../../application/use-cases/abm/estado-turno/dto/update-estado-turno.dto");
const estado_turno_entity_1 = require("../../../domain/entities/estado-turno.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
let EstadoTurnoController = class EstadoTurnoController {
    abmEstadoTurnoUseCase;
    genericRepositoryService;
    constructor(abmEstadoTurnoUseCase, genericRepositoryService) {
        this.abmEstadoTurnoUseCase = abmEstadoTurnoUseCase;
        this.genericRepositoryService = genericRepositoryService;
    }
    async alta(dto) {
        return this.abmEstadoTurnoUseCase.crear(dto);
    }
    async modificacion(id, dto) {
        return this.abmEstadoTurnoUseCase.actualizar(id, dto);
    }
    async baja(id) {
        return this.genericRepositoryService.eliminar(estado_turno_entity_1.EstadoTurno, id);
    }
};
exports.EstadoTurnoController = EstadoTurnoController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estado_turno_dto_1.CreateEstadoTurnoDto]),
    __metadata("design:returntype", Promise)
], EstadoTurnoController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificacion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_estado_turno_dto_1.UpdateEstadoTurnoDto]),
    __metadata("design:returntype", Promise)
], EstadoTurnoController.prototype, "modificacion", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstadoTurnoController.prototype, "baja", null);
exports.EstadoTurnoController = EstadoTurnoController = __decorate([
    (0, common_1.Controller)('estado-turno'),
    __metadata("design:paramtypes", [abm_estado_turno_use_case_1.AbmEstadoTurnoUseCase,
        genericRepository_service_1.GenericRepositoryService])
], EstadoTurnoController);
//# sourceMappingURL=estado-turno.controller.js.map