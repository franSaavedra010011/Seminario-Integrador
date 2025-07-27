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
exports.PersonalHospitalController = void 0;
const common_1 = require("@nestjs/common");
const personal_hospital_service_1 = require("./personal-hospital.service");
const create_personal_hospital_dto_1 = require("./dto/create-personal-hospital.dto");
const update_personal_hospital_dto_1 = require("./dto/update-personal-hospital.dto");
let PersonalHospitalController = class PersonalHospitalController {
    personalHospitalService;
    constructor(personalHospitalService) {
        this.personalHospitalService = personalHospitalService;
    }
    create(createPersonalHospitalDto) {
        return this.personalHospitalService.create(createPersonalHospitalDto);
    }
    findAll() {
        return this.personalHospitalService.findAll();
    }
    findOne(id) {
        return this.personalHospitalService.findOne(+id);
    }
    update(id, updatePersonalHospitalDto) {
        return this.personalHospitalService.update(+id, updatePersonalHospitalDto);
    }
    remove(id) {
        return this.personalHospitalService.remove(+id);
    }
};
exports.PersonalHospitalController = PersonalHospitalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_personal_hospital_dto_1.CreatePersonalHospitalDto]),
    __metadata("design:returntype", void 0)
], PersonalHospitalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersonalHospitalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonalHospitalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_personal_hospital_dto_1.UpdatePersonalHospitalDto]),
    __metadata("design:returntype", void 0)
], PersonalHospitalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonalHospitalController.prototype, "remove", null);
exports.PersonalHospitalController = PersonalHospitalController = __decorate([
    (0, common_1.Controller)('personal-hospital'),
    __metadata("design:paramtypes", [personal_hospital_service_1.PersonalHospitalService])
], PersonalHospitalController);
//# sourceMappingURL=personal-hospital.controller.js.map