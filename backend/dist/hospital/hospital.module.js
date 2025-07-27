"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModule = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("./hospital.service");
const hospital_controller_1 = require("./hospital.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hospital_entity_1 = require("./entities/hospital.entity");
const medico_entity_1 = require("../medico/entities/medico.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let HospitalModule = class HospitalModule {
};
exports.HospitalModule = HospitalModule;
exports.HospitalModule = HospitalModule = __decorate([
    (0, common_1.Module)({
        providers: [hospital_service_1.HospitalService, genericRepository_service_1.GenericRepositoryService],
        controllers: [hospital_controller_1.HospitalController],
        imports: [typeorm_1.TypeOrmModule.forFeature([hospital_entity_1.Hospital, medico_entity_1.Medico])],
        exports: [typeorm_1.TypeOrmModule],
    })
], HospitalModule);
//# sourceMappingURL=hospital.module.js.map