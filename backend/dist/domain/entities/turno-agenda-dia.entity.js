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
exports.TurnoAgendaDia = void 0;
const agenda_dia_entity_1 = require("./agenda-dia.entity");
const turno_entity_1 = require("./turno.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let TurnoAgendaDia = class TurnoAgendaDia extends base_entity_1.Base {
    disponible;
    horaDesde;
    horaHasta;
    agendaDia;
    turno;
};
exports.TurnoAgendaDia = TurnoAgendaDia;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], TurnoAgendaDia.prototype, "disponible", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurnoAgendaDia.prototype, "horaDesde", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurnoAgendaDia.prototype, "horaHasta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agenda_dia_entity_1.AgendaDia, (agendaDia) => agendaDia.turnosAgendaDia),
    __metadata("design:type", agenda_dia_entity_1.AgendaDia)
], TurnoAgendaDia.prototype, "agendaDia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => turno_entity_1.Turno, (turno) => turno.turnoAgendaDia),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", turno_entity_1.Turno)
], TurnoAgendaDia.prototype, "turno", void 0);
exports.TurnoAgendaDia = TurnoAgendaDia = __decorate([
    (0, typeorm_1.Entity)()
], TurnoAgendaDia);
//# sourceMappingURL=turno-agenda-dia.entity.js.map