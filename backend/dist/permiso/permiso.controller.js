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
const permiso_service_1 = require("./permiso.service");
const create_permiso_dto_1 = require("./dto/create-permiso.dto");
const update_permiso_dto_1 = require("./dto/update-permiso.dto");
let PermisoController = class PermisoController {
    permisoService;
    constructor(permisoService) {
        this.permisoService = permisoService;
    }
    create(createPermisoDto) {
        return this.permisoService.create(createPermisoDto);
    }
    findAll() {
        return this.permisoService.findAll();
    }
    findOne(id) {
        return this.permisoService.findOne(+id);
    }
    update(id, updatePermisoDto) {
        return this.permisoService.update(+id, updatePermisoDto);
    }
    remove(id) {
        return this.permisoService.remove(+id);
    }
};
exports.PermisoController = PermisoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permiso_dto_1.CreatePermisoDto]),
    __metadata("design:returntype", void 0)
], PermisoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermisoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermisoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permiso_dto_1.UpdatePermisoDto]),
    __metadata("design:returntype", void 0)
], PermisoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermisoController.prototype, "remove", null);
exports.PermisoController = PermisoController = __decorate([
    (0, common_1.Controller)('permiso'),
    __metadata("design:paramtypes", [permiso_service_1.PermisoService])
], PermisoController);
//# sourceMappingURL=permiso.controller.js.map