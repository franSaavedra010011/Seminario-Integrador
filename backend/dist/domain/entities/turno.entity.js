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
exports.Turno = void 0;
const base_entity_1 = require("./base.entity");
const paciente_entity_1 = require("./paciente.entity");
const medico_entity_1 = require("./medico.entity");
const estado_turno_entity_1 = require("./estado-turno.entity");
const turno_estado_entity_1 = require("./turno-estado.entity");
const especialidad_entity_1 = require("./especialidad.entity");
const historia_medica_entity_1 = require("./historia-medica.entity");
const turno_agenda_dia_entity_1 = require("./turno-agenda-dia.entity");
const hospital_entity_1 = require("./hospital.entity");
const paciente_notificacion_entity_1 = require("./paciente-notificacion.entity");
const typeorm_1 = require("typeorm");
let Turno = class Turno extends base_entity_1.Base {
    fecha;
    hora;
    observaciones;
    presentismo;
    paciente;
    medico;
    estadoTurno;
    turnosEstados;
    especialidad;
    historiasMedica;
    turnoAgendaDia;
    hospital;
    pacienteNotificaciones;
};
exports.Turno = Turno;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Turno.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Turno.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Turno.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Turno.prototype, "presentismo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.turnos),
    __metadata("design:type", paciente_entity_1.Paciente)
], Turno.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.turnos),
    __metadata("design:type", medico_entity_1.Medico)
], Turno.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estado_turno_entity_1.EstadoTurno, (estadoTurno) => estadoTurno.turnos),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", estado_turno_entity_1.EstadoTurno)
], Turno.prototype, "estadoTurno", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_estado_entity_1.TurnoEstado, (turnoEstado) => turnoEstado.turno),
    __metadata("design:type", Array)
], Turno.prototype, "turnosEstados", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, (especialidad) => especialidad.turnos),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], Turno.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historia_medica_entity_1.HistoriaMedica, (historiaMedica) => historiaMedica.turno),
    __metadata("design:type", Array)
], Turno.prototype, "historiasMedica", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => turno_agenda_dia_entity_1.TurnoAgendaDia, (turnoAgendaDia) => turnoAgendaDia.turno),
    __metadata("design:type", turno_agenda_dia_entity_1.TurnoAgendaDia)
], Turno.prototype, "turnoAgendaDia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.turnos),
    __metadata("design:type", hospital_entity_1.Hospital)
], Turno.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paciente_notificacion_entity_1.PacienteNotificacion, (pacienteNotificacion) => pacienteNotificacion.turno),
    __metadata("design:type", Array)
], Turno.prototype, "pacienteNotificaciones", void 0);
exports.Turno = Turno = __decorate([
    (0, typeorm_1.Entity)()
], Turno);
//# sourceMappingURL=turno.entity.js.map