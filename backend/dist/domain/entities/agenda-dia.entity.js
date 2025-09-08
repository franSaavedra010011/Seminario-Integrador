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
const agenda_semanal_entity_1 = require("./agenda-semanal.entity");
const turno_agenda_dia_entity_1 = require("./turno-agenda-dia.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const dia_semana_enum_1 = require("../enums/dia-semana.enum");
let AgendaDia = class AgendaDia extends base_entity_1.Base {
    nombreAgendaDia;
    agendaSemanal;
    turnosAgendaDia;
};
exports.AgendaDia = AgendaDia;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: dia_semana_enum_1.DiaSemanaEnum,
        nullable: false,
    }),
    __metadata("design:type", String)
], AgendaDia.prototype, "nombreAgendaDia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agenda_semanal_entity_1.AgendaSemanal, agendaSemanal => agendaSemanal.agendasDia, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'idAgendaSemanal' }),
    __metadata("design:type", agenda_semanal_entity_1.AgendaSemanal)
], AgendaDia.prototype, "agendaSemanal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_agenda_dia_entity_1.TurnoAgendaDia, turnoAgendaDia => turnoAgendaDia.agendaDia),
    __metadata("design:type", Array)
], AgendaDia.prototype, "turnosAgendaDia", void 0);
exports.AgendaDia = AgendaDia = __decorate([
    (0, typeorm_1.Entity)()
], AgendaDia);
//# sourceMappingURL=agenda-dia.entity.js.map