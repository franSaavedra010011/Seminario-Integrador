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
exports.AbmBaseController = void 0;
const common_1 = require("@nestjs/common");
class AbmBaseController {
    useCase;
    genericRepositoryService;
    entity;
    constructor(useCase, genericRepositoryService, entity) {
        this.useCase = useCase;
        this.genericRepositoryService = genericRepositoryService;
        this.entity = entity;
    }
    async alta(dto) {
        return this.useCase.crear(dto);
    }
    async modificar(id, dto) {
        return this.useCase.actualizar(id, dto);
    }
    async baja(id) {
        return this.genericRepositoryService.eliminar(this.entity, id);
    }
}
exports.AbmBaseController = AbmBaseController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AbmBaseController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificar/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AbmBaseController.prototype, "modificar", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbmBaseController.prototype, "baja", null);
//# sourceMappingURL=base.controller.js.map