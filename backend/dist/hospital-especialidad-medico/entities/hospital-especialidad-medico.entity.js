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
exports.HospitalEspecialidadMedico = void 0;
const agenda_semanal_entity_1 = require("../../agenda-semanal/entities/agenda-semanal.entity");
const hospital_especialidad_entity_1 = require("../../hospital-especialidad/entities/hospital-especialidad.entity");
const medico_entity_1 = require("../../medico/entities/medico.entity");
const typeorm_1 = require("typeorm");
let HospitalEspecialidadMedico = class HospitalEspecialidadMedico {
    idHospitalEspecialidadMedico;
    fechaDesdeHospitalEspecialidadMedico;
    fechaHastaHospitalEspecialidadMedico;
    hospitalEspecialidad;
    medico;
    agendaSemanales;
    get getIdHospitalEspecialidadMedico() {
        return this.idHospitalEspecialidadMedico;
    }
    get getFechaDesdeHospitalEspecialidadMedico() {
        return this.fechaDesdeHospitalEspecialidadMedico;
    }
    set setFechaDesdeHospitalEspecialidadMedico(fechaDesde) {
        this.fechaDesdeHospitalEspecialidadMedico = fechaDesde;
    }
    get getFechaHastaHospitalEspecialidadMedico() {
        return this.fechaHastaHospitalEspecialidadMedico;
    }
    set setFechaHastaHospitalEspecialidadMedico(fechaHasta) {
        this.fechaHastaHospitalEspecialidadMedico = fechaHasta;
    }
    get getMedico() {
        return this.medico;
    }
    setMedico(medico) {
        this.medico = medico;
    }
    get getAgendaSemanales() {
        return this.agendaSemanales;
    }
    set setAgendaSemanales(agendaSemanales) {
        this.agendaSemanales = agendaSemanales;
    }
};
exports.HospitalEspecialidadMedico = HospitalEspecialidadMedico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HospitalEspecialidadMedico.prototype, "idHospitalEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HospitalEspecialidadMedico.prototype, "fechaDesdeHospitalEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], HospitalEspecialidadMedico.prototype, "fechaHastaHospitalEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_especialidad_entity_1.HospitalEspecialidad, (hospitalEspecialidad) => hospitalEspecialidad.hospitalEspecialidadMedico),
    __metadata("design:type", hospital_especialidad_entity_1.HospitalEspecialidad)
], HospitalEspecialidadMedico.prototype, "hospitalEspecialidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.hospitalEspecialidadMedico),
    __metadata("design:type", medico_entity_1.Medico)
], HospitalEspecialidadMedico.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => agenda_semanal_entity_1.AgendaSemanal, (agendaSemanal) => agendaSemanal.hospitalEspecialidadMedico),
    __metadata("design:type", Array)
], HospitalEspecialidadMedico.prototype, "agendaSemanales", void 0);
exports.HospitalEspecialidadMedico = HospitalEspecialidadMedico = __decorate([
    (0, typeorm_1.Entity)()
], HospitalEspecialidadMedico);
//# sourceMappingURL=hospital-especialidad-medico.entity.js.map