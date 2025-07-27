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
exports.HistoriaMedicaController = void 0;
const common_1 = require("@nestjs/common");
const historia_medica_service_1 = require("./historia-medica.service");
const create_historia_medica_dto_1 = require("./dto/create-historia-medica.dto");
const update_historia_medica_dto_1 = require("./dto/update-historia-medica.dto");
let HistoriaMedicaController = class HistoriaMedicaController {
    historiaMedicaService;
    constructor(historiaMedicaService) {
        this.historiaMedicaService = historiaMedicaService;
    }
    create(createHistoriaMedicaDto) {
        return this.historiaMedicaService.create(createHistoriaMedicaDto);
    }
    findAll() {
        return this.historiaMedicaService.findAll();
    }
    findOne(id) {
        return this.historiaMedicaService.findOne(+id);
    }
    update(id, updateHistoriaMedicaDto) {
        return this.historiaMedicaService.update(+id, updateHistoriaMedicaDto);
    }
    remove(id) {
        return this.historiaMedicaService.remove(+id);
    }
};
exports.HistoriaMedicaController = HistoriaMedicaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_historia_medica_dto_1.CreateHistoriaMedicaDto]),
    __metadata("design:returntype", void 0)
], HistoriaMedicaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HistoriaMedicaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HistoriaMedicaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_historia_medica_dto_1.UpdateHistoriaMedicaDto]),
    __metadata("design:returntype", void 0)
], HistoriaMedicaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HistoriaMedicaController.prototype, "remove", null);
exports.HistoriaMedicaController = HistoriaMedicaController = __decorate([
    (0, common_1.Controller)('historia-medica'),
    __metadata("design:paramtypes", [historia_medica_service_1.HistoriaMedicaService])
], HistoriaMedicaController);
//# sourceMappingURL=historia-medica.controller.js.map