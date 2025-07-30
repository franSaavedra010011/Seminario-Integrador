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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnoAgendaDia = void 0;
const agenda_dia_entity_1 = require("../../domain/entities/agenda-dia.entity");
const turno_entity_1 = require("src/turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let TurnoAgendaDia = class TurnoAgendaDia {
    idTurnoAgendaDia;
    disponibleTurnoAgendaDia;
    horaDesdeTurnoAgendaDia;
    horaHastaTurnoAgendaDia;
    fechaHoraBajaTurnoAgendaDia;
    agendaDia;
    turno;
    get getIdTurnoAgendaDia() {
        return this.idTurnoAgendaDia;
    }
    get getDisponibleTurnoAgendaDia() {
        return this.disponibleTurnoAgendaDia;
    }
    set setDisponibleTurnoAgendaDia(value) {
        this.disponibleTurnoAgendaDia = value;
    }
    get getHoraDesdeTurnoAgendaDia() {
        return this.horaDesdeTurnoAgendaDia;
    }
    set setHoraDesdeTurnoAgendaDia(value) {
        this.horaDesdeTurnoAgendaDia = value;
    }
    get getHoraHastaTurnoAgendaDia() {
        return this.horaHastaTurnoAgendaDia;
    }
    set setHoraHastaTurnoAgendaDia(value) {
        this.horaHastaTurnoAgendaDia = value;
    }
    get getFechaHoraBajaTurnoAgendaDia() {
        return this.fechaHoraBajaTurnoAgendaDia;
    }
    set setFechaHoraBajaTurnoAgendaDia(value) {
        this.fechaHoraBajaTurnoAgendaDia = value;
    }
    get getTurno() {
        return this.turno;
    }
    set setTurno(value) {
        this.turno = value;
    }
};
exports.TurnoAgendaDia = TurnoAgendaDia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TurnoAgendaDia.prototype, "idTurnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], TurnoAgendaDia.prototype, "disponibleTurnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurnoAgendaDia.prototype, "horaDesdeTurnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurnoAgendaDia.prototype, "horaHastaTurnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TurnoAgendaDia.prototype, "fechaHoraBajaTurnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agenda_dia_entity_1.AgendaDia, (agendaDia) => agendaDia.turnosAgendaDia),
    __metadata("design:type", agenda_dia_entity_1.AgendaDia)
], TurnoAgendaDia.prototype, "agendaDia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => turno_entity_1.Turno, (turno) => turno.turnoAgendaDia),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_a = typeof turno_entity_1.Turno !== "undefined" && turno_entity_1.Turno) === "function" ? _a : Object)
], TurnoAgendaDia.prototype, "turno", void 0);
exports.TurnoAgendaDia = TurnoAgendaDia = __decorate([
    (0, typeorm_1.Entity)()
], TurnoAgendaDia);
//# sourceMappingURL=turno-agenda-dia.entity.js.map