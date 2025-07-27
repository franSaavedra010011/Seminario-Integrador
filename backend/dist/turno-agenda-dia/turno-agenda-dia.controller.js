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
exports.TurnoAgendaDiaController = void 0;
const common_1 = require("@nestjs/common");
const turno_agenda_dia_service_1 = require("./turno-agenda-dia.service");
const create_turno_agenda_dia_dto_1 = require("./dto/create-turno-agenda-dia.dto");
const update_turno_agenda_dia_dto_1 = require("./dto/update-turno-agenda-dia.dto");
let TurnoAgendaDiaController = class TurnoAgendaDiaController {
    turnoAgendaDiaService;
    constructor(turnoAgendaDiaService) {
        this.turnoAgendaDiaService = turnoAgendaDiaService;
    }
    create(createTurnoAgendaDiaDto) {
        return this.turnoAgendaDiaService.create(createTurnoAgendaDiaDto);
    }
    findAll() {
        return this.turnoAgendaDiaService.findAll();
    }
    findOne(id) {
        return this.turnoAgendaDiaService.findOne(+id);
    }
    update(id, updateTurnoAgendaDiaDto) {
        return this.turnoAgendaDiaService.update(+id, updateTurnoAgendaDiaDto);
    }
    remove(id) {
        return this.turnoAgendaDiaService.remove(+id);
    }
};
exports.TurnoAgendaDiaController = TurnoAgendaDiaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turno_agenda_dia_dto_1.CreateTurnoAgendaDiaDto]),
    __metadata("design:returntype", void 0)
], TurnoAgendaDiaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TurnoAgendaDiaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurnoAgendaDiaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_turno_agenda_dia_dto_1.UpdateTurnoAgendaDiaDto]),
    __metadata("design:returntype", void 0)
], TurnoAgendaDiaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TurnoAgendaDiaController.prototype, "remove", null);
exports.TurnoAgendaDiaController = TurnoAgendaDiaController = __decorate([
    (0, common_1.Controller)('turno-agenda-dia'),
    __metadata("design:paramtypes", [turno_agenda_dia_service_1.TurnoAgendaDiaService])
], TurnoAgendaDiaController);
//# sourceMappingURL=turno-agenda-dia.controller.js.map