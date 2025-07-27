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
exports.HospitalEspecialidadController = void 0;
const common_1 = require("@nestjs/common");
const hospital_especialidad_service_1 = require("./hospital-especialidad.service");
const create_hospital_especialidad_dto_1 = require("./dto/create-hospital-especialidad.dto");
const update_hospital_especialidad_dto_1 = require("./dto/update-hospital-especialidad.dto");
let HospitalEspecialidadController = class HospitalEspecialidadController {
    hospitalEspecialidadService;
    constructor(hospitalEspecialidadService) {
        this.hospitalEspecialidadService = hospitalEspecialidadService;
    }
    create(createHospitalEspecialidadDto) {
        return this.hospitalEspecialidadService.create(createHospitalEspecialidadDto);
    }
    findAll() {
        return this.hospitalEspecialidadService.findAll();
    }
    findOne(id) {
        return this.hospitalEspecialidadService.findOne(+id);
    }
    update(id, updateHospitalEspecialidadDto) {
        return this.hospitalEspecialidadService.update(+id, updateHospitalEspecialidadDto);
    }
    remove(id) {
        return this.hospitalEspecialidadService.remove(+id);
    }
};
exports.HospitalEspecialidadController = HospitalEspecialidadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hospital_especialidad_dto_1.CreateHospitalEspecialidadDto]),
    __metadata("design:returntype", void 0)
], HospitalEspecialidadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalEspecialidadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalEspecialidadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hospital_especialidad_dto_1.UpdateHospitalEspecialidadDto]),
    __metadata("design:returntype", void 0)
], HospitalEspecialidadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalEspecialidadController.prototype, "remove", null);
exports.HospitalEspecialidadController = HospitalEspecialidadController = __decorate([
    (0, common_1.Controller)('hospital-especialidad'),
    __metadata("design:paramtypes", [hospital_especialidad_service_1.HospitalEspecialidadService])
], HospitalEspecialidadController);
//# sourceMappingURL=hospital-especialidad.controller.js.map