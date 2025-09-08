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
exports.HospitalEspecialidad = void 0;
const especialidad_entity_1 = require("./especialidad.entity");
const hospital_especialidad_medico_entity_1 = require("./hospital-especialidad-medico.entity");
const hospital_entity_1 = require("./hospital.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let HospitalEspecialidad = class HospitalEspecialidad extends base_entity_1.Base {
    fechaDesde;
    fechaHasta;
    hospital;
    especialidad;
    hospitalEspecialidadMedico;
};
exports.HospitalEspecialidad = HospitalEspecialidad;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HospitalEspecialidad.prototype, "fechaDesde", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], HospitalEspecialidad.prototype, "fechaHasta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.hospitalEspecialidades),
    (0, typeorm_1.JoinColumn)({ name: 'idHospital' }),
    __metadata("design:type", hospital_entity_1.Hospital)
], HospitalEspecialidad.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, (especialidad) => especialidad.hospitalEspecialidades, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idEspecialidad' }),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], HospitalEspecialidad.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico, (heMedico) => heMedico.hospitalEspecialidad),
    __metadata("design:type", Array)
], HospitalEspecialidad.prototype, "hospitalEspecialidadMedico", void 0);
exports.HospitalEspecialidad = HospitalEspecialidad = __decorate([
    (0, typeorm_1.Entity)()
], HospitalEspecialidad);
//# sourceMappingURL=hospital-especialidad.entity.js.map