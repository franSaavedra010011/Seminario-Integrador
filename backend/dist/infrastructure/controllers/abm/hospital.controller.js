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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const genericRepository_service_1 = require("./../../../shared/utils/genericRepository.service");
const abm_hospital_use_case_1 = require("./../../../application/use-cases/abm/hospital/abm-hospital.use-case");
const common_1 = require("@nestjs/common");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const abm_base_controller_1 = require("./abm-base.controller");
let HospitalController = class HospitalController extends abm_base_controller_1.AbmBaseController {
    constructor(abmHospitalUseCase, genericRepositoryService) {
        super(abmHospitalUseCase, genericRepositoryService, hospital_entity_1.Hospital);
    }
};
exports.HospitalController = HospitalController;
exports.HospitalController = HospitalController = __decorate([
    (0, common_1.Controller)('hospital'),
    __metadata("design:paramtypes", [abm_hospital_use_case_1.AbmHospitalUseCase,
        genericRepository_service_1.GenericRepositoryService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map