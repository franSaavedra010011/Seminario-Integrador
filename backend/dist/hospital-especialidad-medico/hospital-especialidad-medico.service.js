"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalEspecialidadMedicoService = void 0;
const common_1 = require("@nestjs/common");
let HospitalEspecialidadMedicoService = class HospitalEspecialidadMedicoService {
    create(createHospitalEspecialidadMedicoDto) {
        return 'This action adds a new hospitalEspecialidadMedico';
    }
    findAll() {
        return `This action returns all hospitalEspecialidadMedico`;
    }
    findOne(id) {
        return `This action returns a #${id} hospitalEspecialidadMedico`;
    }
    update(id, updateHospitalEspecialidadMedicoDto) {
        return `This action updates a #${id} hospitalEspecialidadMedico`;
    }
    remove(id) {
        return `This action removes a #${id} hospitalEspecialidadMedico`;
    }
};
exports.HospitalEspecialidadMedicoService = HospitalEspecialidadMedicoService;
exports.HospitalEspecialidadMedicoService = HospitalEspecialidadMedicoService = __decorate([
    (0, common_1.Injectable)()
], HospitalEspecialidadMedicoService);
//# sourceMappingURL=hospital-especialidad-medico.service.js.map