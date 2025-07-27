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
const estado_turno_service_1 = require("./estado-turno.service");
const create_estado_turno_dto_1 = require("./dto/create-estado-turno.dto");
const update_estado_turno_dto_1 = require("./dto/update-estado-turno.dto");
let EstadoTurnoController = class EstadoTurnoController {
    estadoTurnoService;
    constructor(estadoTurnoService) {
        this.estadoTurnoService = estadoTurnoService;
    }
    create(createEstadoTurnoDto) {
        return this.estadoTurnoService.create(createEstadoTurnoDto);
    }
    findAll() {
        return this.estadoTurnoService.findAll();
    }
    findOne(id) {
        return this.estadoTurnoService.findOne(+id);
    }
    update(id, updateEstadoTurnoDto) {
        return this.estadoTurnoService.update(+id, updateEstadoTurnoDto);
    }
    remove(id) {
        return this.estadoTurnoService.remove(+id);
    }
};
exports.EstadoTurnoController = EstadoTurnoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_estado_turno_dto_1.CreateEstadoTurnoDto]),
    __metadata("design:returntype", void 0)
], EstadoTurnoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstadoTurnoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadoTurnoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_estado_turno_dto_1.UpdateEstadoTurnoDto]),
    __metadata("design:returntype", void 0)
], EstadoTurnoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EstadoTurnoController.prototype, "remove", null);
exports.EstadoTurnoController = EstadoTurnoController = __decorate([
    (0, common_1.Controller)('estado-turno'),
    __metadata("design:paramtypes", [estado_turno_service_1.EstadoTurnoService])
], EstadoTurnoController);
//# sourceMappingURL=estado-turno.controller.js.map