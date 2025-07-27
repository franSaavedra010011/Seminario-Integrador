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
exports.CongestionHistoricoController = void 0;
const common_1 = require("@nestjs/common");
const congestion_historico_service_1 = require("./congestion-historico.service");
const create_congestion_historico_dto_1 = require("./dto/create-congestion-historico.dto");
const update_congestion_historico_dto_1 = require("./dto/update-congestion-historico.dto");
let CongestionHistoricoController = class CongestionHistoricoController {
    congestionHistoricoService;
    constructor(congestionHistoricoService) {
        this.congestionHistoricoService = congestionHistoricoService;
    }
    create(createCongestionHistoricoDto) {
        return this.congestionHistoricoService.create(createCongestionHistoricoDto);
    }
    findAll() {
        return this.congestionHistoricoService.findAll();
    }
    findOne(id) {
        return this.congestionHistoricoService.findOne(+id);
    }
    update(id, updateCongestionHistoricoDto) {
        return this.congestionHistoricoService.update(+id, updateCongestionHistoricoDto);
    }
    remove(id) {
        return this.congestionHistoricoService.remove(+id);
    }
};
exports.CongestionHistoricoController = CongestionHistoricoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_congestion_historico_dto_1.CreateCongestionHistoricoDto]),
    __metadata("design:returntype", void 0)
], CongestionHistoricoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CongestionHistoricoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CongestionHistoricoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_congestion_historico_dto_1.UpdateCongestionHistoricoDto]),
    __metadata("design:returntype", void 0)
], CongestionHistoricoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CongestionHistoricoController.prototype, "remove", null);
exports.CongestionHistoricoController = CongestionHistoricoController = __decorate([
    (0, common_1.Controller)('congestion-historico'),
    __metadata("design:paramtypes", [congestion_historico_service_1.CongestionHistoricoService])
], CongestionHistoricoController);
//# sourceMappingURL=congestion-historico.controller.js.map