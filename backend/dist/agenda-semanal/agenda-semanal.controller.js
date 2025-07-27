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
exports.AgendaSemanalController = void 0;
const common_1 = require("@nestjs/common");
const agenda_semanal_service_1 = require("./agenda-semanal.service");
const create_agenda_semanal_dto_1 = require("./dto/create-agenda-semanal.dto");
const update_agenda_semanal_dto_1 = require("./dto/update-agenda-semanal.dto");
let AgendaSemanalController = class AgendaSemanalController {
    agendaSemanalService;
    constructor(agendaSemanalService) {
        this.agendaSemanalService = agendaSemanalService;
    }
    create(createAgendaSemanalDto) {
        return this.agendaSemanalService.create(createAgendaSemanalDto);
    }
    findAll() {
        return this.agendaSemanalService.findAll();
    }
    findOne(id) {
        return this.agendaSemanalService.findOne(+id);
    }
    update(id, updateAgendaSemanalDto) {
        return this.agendaSemanalService.update(+id, updateAgendaSemanalDto);
    }
    remove(id) {
        return this.agendaSemanalService.remove(+id);
    }
};
exports.AgendaSemanalController = AgendaSemanalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agenda_semanal_dto_1.CreateAgendaSemanalDto]),
    __metadata("design:returntype", void 0)
], AgendaSemanalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgendaSemanalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgendaSemanalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agenda_semanal_dto_1.UpdateAgendaSemanalDto]),
    __metadata("design:returntype", void 0)
], AgendaSemanalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgendaSemanalController.prototype, "remove", null);
exports.AgendaSemanalController = AgendaSemanalController = __decorate([
    (0, common_1.Controller)('agenda-semanal'),
    __metadata("design:paramtypes", [agenda_semanal_service_1.AgendaSemanalService])
], AgendaSemanalController);
//# sourceMappingURL=agenda-semanal.controller.js.map