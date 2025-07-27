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
exports.LocalidadController = void 0;
const common_1 = require("@nestjs/common");
const localidad_service_1 = require("./localidad.service");
const create_localidad_dto_1 = require("./dto/create-localidad.dto");
const update_localidad_dto_1 = require("./dto/update-localidad.dto");
let LocalidadController = class LocalidadController {
    localidadService;
    constructor(localidadService) {
        this.localidadService = localidadService;
    }
    create(createLocalidadDto) {
        return this.localidadService.create(createLocalidadDto);
    }
    findAll() {
        return this.localidadService.findAll();
    }
    findOne(id) {
        return this.localidadService.findOne(+id);
    }
    update(id, updateLocalidadDto) {
        return this.localidadService.update(+id, updateLocalidadDto);
    }
    remove(id) {
        return this.localidadService.remove(+id);
    }
};
exports.LocalidadController = LocalidadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_localidad_dto_1.CreateLocalidadDto]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_localidad_dto_1.UpdateLocalidadDto]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocalidadController.prototype, "remove", null);
exports.LocalidadController = LocalidadController = __decorate([
    (0, common_1.Controller)('localidad'),
    __metadata("design:paramtypes", [localidad_service_1.LocalidadService])
], LocalidadController);
//# sourceMappingURL=localidad.controller.js.map