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
const typeorm_1 = require("typeorm");
const paciente_entity_1 = require("../../domain/entities/paciente.entity");
const medico_entity_1 = require("../../domain/entities/medico.entity");
const estado_turno_entity_1 = require("../../domain/entities/estado-turno.entity");
const turno_estado_entity_1 = require("../../turno-estado/entities/turno-estado.entity");
const especialidad_entity_1 = require("../../domain/entities/especialidad.entity");
const historia_medica_entity_1 = require("../../domain/entities/historia-medica.entity");
const turno_agenda_dia_entity_1 = require("../../turno-agenda-dia/entities/turno-agenda-dia.entity");
const hospital_entity_1 = require("../../domain/entities/hospital.entity");
const paciente_notificacion_entity_1 = require("../../domain/entities/paciente-notificacion.entity");
let Turno = class Turno {
    idTurno;
    fechaAltaTurno;
    fechaTurno;
    horaTurno;
    observaconesTurno;
    presentismoTurno;
    fechaHoraBajaTurno;
    paciente;
    medico;
    estadoTurno;
    turnosEstados;
    especialidad;
    historiasMedica;
    turnoAgendaDia;
    hospital;
    pacienteNotificaciones;
    get getIdTurno() {
        return this.idTurno;
    }
    get getFechaAltaTurno() {
        return this.fechaAltaTurno;
    }
    set setFechaAltaTurno(value) {
        this.fechaAltaTurno = value;
    }
    get getFechaTurno() {
        return this.fechaTurno;
    }
    set setFechaTurno(value) {
        this.fechaTurno = value;
    }
    get getHoraTurno() {
        return this.horaTurno;
    }
    set setHoraTurno(value) {
        this.horaTurno = value;
    }
    get getObservaconesTurno() {
        return this.observaconesTurno;
    }
    set setObservaconesTurno(value) {
        this.observaconesTurno = value;
    }
    get getPresentismoTurno() {
        return this.presentismoTurno;
    }
    set setPresentismoTurno(value) {
        this.presentismoTurno = value;
    }
    get getFechaHoraBajaTurno() {
        return this.fechaHoraBajaTurno;
    }
    set setFechaHoraBajaTurno(value) {
        this.fechaHoraBajaTurno = value;
    }
    get getMedico() {
        return this.medico;
    }
    set setMedico(value) {
        this.medico = value;
    }
    get getEstadoTurno() {
        return this.estadoTurno;
    }
    set setEstadoTurno(value) {
        this.estadoTurno = value;
    }
    get getTurnosEstados() {
        return this.turnosEstados;
    }
    set setTurnosEstados(value) {
        this.turnosEstados = value;
    }
    get getEspecialidad() {
        return this.especialidad;
    }
    set setEspecialidad(value) {
        this.especialidad = value;
    }
    get getHistoriasMedica() {
        return this.historiasMedica;
    }
    set setHistoriasMedica(value) {
        this.historiasMedica = value;
    }
    get getHospital() {
        return this.hospital;
    }
    set setHospital(value) {
        this.hospital = value;
    }
};
exports.Turno = Turno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Turno.prototype, "idTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Turno.prototype, "fechaAltaTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Turno.prototype, "fechaTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Turno.prototype, "horaTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Turno.prototype, "observaconesTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Turno.prototype, "presentismoTurno", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Turno.prototype, "fechaHoraBajaTurno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.turnos),
    __metadata("design:type", paciente_entity_1.Paciente)
], Turno.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.turnos),
    __metadata("design:type", medico_entity_1.Medico)
], Turno.prototype, "medico", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => estado_turno_entity_1.EstadoTurno, (estadoTurno) => estadoTurno.turno),
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