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
exports.TurnoEstadoController = void 0;
const common_1 = require("@nestjs/common");
const turno_estado_service_1 = require("./turno-estado.service");
const create_turno_estado_dto_1 = require("./dto/create-turno-estado.dto");
const update_turno_estado_dto_1 = require("./dto/update-turno-estado.dto");
let TurnoEstadoController = class TurnoEstadoController {
    turnoEstadoService;
    constructor(turnoEstadoService) {
        this.turnoEstadoService = turnoEstadoService;
    }
    create(createTurnoEstadoDto) {
        return this.turnoEstadoService.create(createTurnoEstadoDto);
    }
    findAll() {
        return this.turnoEstadoService.findAll();
    }
    findOne(id) {
        return this.turnoEstadoService.findOne(+id);
    }
    update(id, updateTurnoEstadoDto) {
        return this.turnoEstadoService.update(+id, updateTurnoEstadoDto);
    }
    remove(id) {
        return this.turnoEstadoService.remove(+id);
    }
};
exports.TurnoEstadoController = TurnoEstadoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turno_estado_dto_1.CreateTurnoEstadoDto]),
    __metadata("design:returntype", void 0)
], TurnoEstadoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TurnoEstadoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurnoEstadoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_turno_estado_dto_1.UpdateTurnoEstadoDto]),
    __metadata("design:returntype", void 0)
], TurnoEstadoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurnoEstadoController.prototype, "remove", null);
exports.TurnoEstadoController = TurnoEstadoController = __decorate([
    (0, common_1.Controller)('turno-estado'),
    __metadata("design:paramtypes", [turno_estado_service_1.TurnoEstadoService])
], TurnoEstadoController);
//# sourceMappingURL=turno-estado.controller.js.map