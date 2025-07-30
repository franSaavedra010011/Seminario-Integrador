"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalEspecialidadMedicoModule = void 0;
const common_1 = require("@nestjs/common");
const hospital_especialidad_medico_service_1 = require("./hospital-especialidad-medico.service");
const typeorm_1 = require("@nestjs/typeorm");
const hospital_especialidad_medico_entity_1 = require("../domain/entities/hospital-especialidad-medico.entity");
const hospital_especialidad_medico_controller_1 = require("./hospital-especialidad-medico.controller");
let HospitalEspecialidadMedicoModule = class HospitalEspecialidadMedicoModule {
};
exports.HospitalEspecialidadMedicoModule = HospitalEspecialidadMedicoModule;
exports.HospitalEspecialidadMedicoModule = HospitalEspecialidadMedicoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico])],
        controllers: [hospital_especialidad_medico_controller_1.HospitalEspecialidadMedicoController],
        providers: [hospital_especialidad_medico_service_1.HospitalEspecialidadMedicoService],
        exports: [hospital_especialidad_medico_service_1.HospitalEspecialidadMedicoService, typeorm_1.TypeOrmModule],
    })
], HospitalEspecialidadMedicoModule);
//# sourceMappingURL=hospital-especialidad-medico.module.js.map