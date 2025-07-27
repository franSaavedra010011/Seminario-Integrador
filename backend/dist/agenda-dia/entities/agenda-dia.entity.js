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
exports.AgendaDia = void 0;
const agenda_semanal_entity_1 = require("../../agenda-semanal/entities/agenda-semanal.entity");
const turno_agenda_dia_entity_1 = require("../../turno-agenda-dia/entities/turno-agenda-dia.entity");
const typeorm_1 = require("typeorm");
let AgendaDia = class AgendaDia {
    idAgendaDia;
    nombreAgendaDia;
    fechaHoraBajaAgendaDia;
    agendaSemanal;
    turnosAgendaDia;
    get getIdAgendaDia() {
        return this.idAgendaDia;
    }
    get getNombreAgendaDia() {
        return this.nombreAgendaDia;
    }
    set setNombreAgendaDia(nombreAgendaDia) {
        this.nombreAgendaDia = nombreAgendaDia;
    }
    get getFechaHoraBajaAgendaDia() {
        return this.fechaHoraBajaAgendaDia;
    }
    set setFechaHoraBajaAgendaDia(fechaHoraBajaAgendaDia) {
        this.fechaHoraBajaAgendaDia = fechaHoraBajaAgendaDia;
    }
    get getTurnosAgendaDia() {
        return this.turnosAgendaDia;
    }
    set setTurnosAgendaDia(turnosAgendaDia) {
        this.turnosAgendaDia = turnosAgendaDia;
    }
};
exports.AgendaDia = AgendaDia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AgendaDia.prototype, "idAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AgendaDia.prototype, "nombreAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AgendaDia.prototype, "fechaHoraBajaAgendaDia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agenda_semanal_entity_1.AgendaSemanal, (agendaSemanal) => agendaSemanal.agendasDia),
    __metadata("design:type", agenda_semanal_entity_1.AgendaSemanal)
], AgendaDia.prototype, "agendaSemanal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_agenda_dia_entity_1.TurnoAgendaDia, (turnoAgendaDia) => turnoAgendaDia.agendaDia),
    __metadata("design:type", Array)
], AgendaDia.prototype, "turnosAgendaDia", void 0);
exports.AgendaDia = AgendaDia = __decorate([
    (0, typeorm_1.Entity)()
], AgendaDia);
//# sourceMappingURL=agenda-dia.entity.js.map