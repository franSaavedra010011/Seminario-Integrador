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
exports.PacienteNotificacion = void 0;
const paciente_entity_1 = require("./paciente.entity");
const turno_entity_1 = require("src/turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let PacienteNotificacion = class PacienteNotificacion {
    idPacienteNotificacion;
    observacionPacienteNotificacion;
    fechaHoraBajaPacienteNotificacion;
    paciente;
    turno;
    get getIdPacienteNotificacion() {
        return this.idPacienteNotificacion;
    }
    get getObservacionPacienteNotificacion() {
        return this.observacionPacienteNotificacion;
    }
    set setObservacionPacienteNotificacion(observacion) {
        this.observacionPacienteNotificacion = observacion;
    }
    get getFechaHoraBajaPacienteNotificacion() {
        return this.fechaHoraBajaPacienteNotificacion;
    }
    set setFechaHoraBajaPacienteNotificacion(fecha) {
        this.fechaHoraBajaPacienteNotificacion = fecha;
    }
    get getTurno() {
        return this.turno;
    }
    set setTurno(turno) {
        this.turno = turno;
    }
};
exports.PacienteNotificacion = PacienteNotificacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PacienteNotificacion.prototype, "idPacienteNotificacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PacienteNotificacion.prototype, "observacionPacienteNotificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], PacienteNotificacion.prototype, "fechaHoraBajaPacienteNotificacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.pacienteNotificaciones),
    __metadata("design:type", paciente_entity_1.Paciente)
], PacienteNotificacion.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, (turno) => turno.pacienteNotificaciones),
    __metadata("design:type", typeof (_a = typeof turno_entity_1.Turno !== "undefined" && turno_entity_1.Turno) === "function" ? _a : Object)
], PacienteNotificacion.prototype, "turno", void 0);
exports.PacienteNotificacion = PacienteNotificacion = __decorate([
    (0, typeorm_1.Entity)()
], PacienteNotificacion);
//# sourceMappingURL=paciente-notificacion.entity.js.map