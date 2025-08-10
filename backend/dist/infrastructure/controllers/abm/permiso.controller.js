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
exports.PermisoController = void 0;
const common_1 = require("@nestjs/common");
const create_permiso_dto_1 = require("../../../application/use-cases/abm/permiso/dto/create-permiso.dto");
const update_permiso_dto_1 = require("../../../application/use-cases/abm/permiso/dto/update-permiso.dto");
const permiso_entity_1 = require("../../../domain/entities/permiso.entity");
class PermisoController {
    abmPermisoUseCase;
    genericRepositoryService;
    constructor(abmPermisoUseCase, genericRepositoryService) {
        this.abmPermisoUseCase = abmPermisoUseCase;
        this.genericRepositoryService = genericRepositoryService;
    }
    async alta(createPermisoDto) {
        return this.abmPermisoUseCase.crear(createPermisoDto);
    }
    async modificar(id, updatePermisoDto) {
        return this.abmPermisoUseCase.actualizar(id, updatePermisoDto);
    }
    async baja(id) {
        return this.genericRepositoryService.eliminar(permiso_entity_1.Permiso, id);
    }
}
exports.PermisoController = PermisoController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permiso_dto_1.CreatePermisoDto]),
    __metadata("design:returntype", Promise)
], PermisoController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_permiso_dto_1.UpdatePermisoDto]),
    __metadata("design:returntype", Promise)
], PermisoController.prototype, "modificar", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermisoController.prototype, "baja", null);
//# sourceMappingURL=permiso.controller.js.map