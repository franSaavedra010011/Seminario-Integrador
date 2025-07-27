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
const agenda_dia_entity_1 = require("../../agenda-dia/entities/agenda-dia.entity");
const hospital_especialidad_medico_entity_1 = require("../../hospital-especialidad-medico/entities/hospital-especialidad-medico.entity");
const typeorm_1 = require("typeorm");
let AgendaSemanal = class AgendaSemanal {
    idAgendaSemanal;
    fechaDesdeAgendaSemanal;
    fechaHastaAgendaSemanal;
    fechaHoraBajaAgendaSemanal;
    nroSemana;
    hospitalEspecialidadMedico;
    agendasDia;
    get getIdAgendaSemanal() {
        return this.idAgendaSemanal;
    }
    get getFechaDesdeAgendaSemanal() {
        return this.fechaDesdeAgendaSemanal;
    }
    set setFechaDesdeAgendaSemanal(fechaDesdeAgendaSemanal) {
        this.fechaDesdeAgendaSemanal = fechaDesdeAgendaSemanal;
    }
    get getFechaHastaAgendaSemanal() {
        return this.fechaHastaAgendaSemanal;
    }
    set setFechaHastaAgendaSemanal(fechaHastaAgendaSemanal) {
        this.fechaHastaAgendaSemanal = fechaHastaAgendaSemanal;
    }
    get getFechaHoraBajaAgendaSemanal() {
        return this.fechaHoraBajaAgendaSemanal;
    }
    set setFechaHoraBajaAgendaSemanal(fechaHoraBajaAgendaSemanal) {
        this.fechaHoraBajaAgendaSemanal = fechaHoraBajaAgendaSemanal;
    }
    get getNroSemana() {
        return this.nroSemana;
    }
    set setNroSemana(nroSemana) {
        this.nroSemana = nroSemana;
    }
    get getAgendasDia() {
        return this.agendasDia;
    }
    set setAgendasDia(agendasDia) {
        this.agendasDia = agendasDia;
    }
};
exports.AgendaSemanal = AgendaSemanal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AgendaSemanal.prototype, "idAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AgendaSemanal.prototype, "fechaDesdeAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AgendaSemanal.prototype, "fechaHastaAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AgendaSemanal.prototype, "fechaHoraBajaAgendaSemanal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AgendaSemanal.prototype, "nroSemana", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico, (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.agendaSemanales),
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