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
exports.AgendaSemanal = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const agenda_dia_entity_1 = require("./agenda-dia.entity");
const hospital_especialidad_medico_entity_1 = require("./hospital-especialidad-medico.entity");
let AgendaSemanal = class AgendaSemanal extends base_entity_1.Base {
    fechaDesdeAgendaSemanal;
    fechaHastaAgendaSemanal;
    nroSemana;
    hospitalEspecialidadMedico;
    agendasDia;
};
exports.AgendaSemanal = AgendaSemanal;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AgendaSemanal.prototype, "fechaDesdeAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AgendaSemanal.prototype, "fechaHastaAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AgendaSemanal.prototype, "nroSemana", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico, (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.agendaSemanales),
    (0, typeorm_1.JoinColumn)({ name: 'idHospitalEspecialidadMedico' }),
    __metadata("design:type", hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico)
], AgendaSemanal.prototype, "hospitalEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agenda_dia_entity_1.AgendaDia, (agendaDia) => agendaDia.agendaSemanal),
    __metadata("design:type", Array)
], AgendaSemanal.prototype, "agendasDia", void 0);
exports.AgendaSemanal = AgendaSemanal = __decorate([
    (0, typeorm_1.Entity)()
], AgendaSemanal);
//# sourceMappingURL=agenda-semanal.entity.js.map