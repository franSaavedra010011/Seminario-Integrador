"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalEspecialidadModule = void 0;
const common_1 = require("@nestjs/common");
const hospital_especialidad_service_1 = require("./hospital-especialidad.service");
const hospital_especialidad_controller_1 = require("./hospital-especialidad.controller");
let HospitalEspecialidadModule = class HospitalEspecialidadModule {
};
exports.HospitalEspecialidadModule = HospitalEspecialidadModule;
exports.HospitalEspecialidadModule = HospitalEspecialidadModule = __decorate([
    (0, common_1.Module)({
        controllers: [hospital_especialidad_controller_1.HospitalEspecialidadController],
        providers: [hospital_especialidad_service_1.HospitalEspecialidadService],
    })
], HospitalEspecialidadModule);
//# sourceMappingURL=hospital-especialidad.module.js.map