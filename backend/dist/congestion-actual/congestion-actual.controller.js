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
exports.CongestionActualController = void 0;
const common_1 = require("@nestjs/common");
const congestion_actual_service_1 = require("./congestion-actual.service");
const create_congestion_actual_dto_1 = require("./dto/create-congestion-actual.dto");
const update_congestion_actual_dto_1 = require("./dto/update-congestion-actual.dto");
let CongestionActualController = class CongestionActualController {
    congestionActualService;
    constructor(congestionActualService) {
        this.congestionActualService = congestionActualService;
    }
    create(createCongestionActualDto) {
        return this.congestionActualService.create(createCongestionActualDto);
    }
    findAll() {
        return this.congestionActualService.findAll();
    }
    findOne(id) {
        return this.congestionActualService.findOne(+id);
    }
    update(id, updateCongestionActualDto) {
        return this.congestionActualService.update(+id, updateCongestionActualDto);
    }
    remove(id) {
        return this.congestionActualService.remove(+id);
    }
};
exports.CongestionActualController = CongestionActualController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_congestion_actual_dto_1.CreateCongestionActualDto]),
    __metadata("design:returntype", void 0)
], CongestionActualController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CongestionActualController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CongestionActualController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_congestion_actual_dto_1.UpdateCongestionActualDto]),
    __metadata("design:returntype", void 0)
], CongestionActualController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CongestionActualController.prototype, "remove", null);
exports.CongestionActualController = CongestionActualController = __decorate([
    (0, common_1.Controller)('congestion-actual'),
    __metadata("design:paramtypes", [congestion_actual_service_1.CongestionActualService])
], CongestionActualController);
//# sourceMappingURL=congestion-actual.controller.js.map