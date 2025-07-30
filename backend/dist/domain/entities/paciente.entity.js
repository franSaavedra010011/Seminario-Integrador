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
exports.Paciente = void 0;
const typeorm_1 = require("typeorm");
const turno_entity_1 = require("../../turno/entities/turno.entity");
const usuario_entity_1 = require("./usuario.entity");
const paciente_notificacion_entity_1 = require("./paciente-notificacion.entity");
let Paciente = class Paciente {
    id;
    nombrePaciente;
    apellidoPaciente;
    edadPaciente;
    fechaNacimientoPaciente;
    celularPaciente;
    correoPaciente;
    grupoSanguineoPaciente;
    fechaHoraBajaPaciente;
    turnos;
    usuario;
    pacienteNotificaciones;
    get getNombrePaciente() {
        return this.nombrePaciente;
    }
    set setNombrePaciente(value) {
        this.nombrePaciente = value.trim();
    }
    get getApellidoPaciente() {
        return this.apellidoPaciente;
    }
    set setApellidoPaciente(value) {
        this.apellidoPaciente = value.trim();
    }
    get getEdadPaciente() {
        return this.edadPaciente;
    }
    set setEdadPaciente(value) {
        this.edadPaciente = value;
    }
    get getFechaNacimientoPaciente() {
        return this.fechaNacimientoPaciente;
    }
    set setFechaNacimientoPaciente(value) {
        this.fechaNacimientoPaciente = value;
    }
    get getCelularPaciente() {
        return this.celularPaciente;
    }
    set setCelularPaciente(value) {
        this.celularPaciente = value.trim();
    }
    get getCorreoPaciente() {
        return this.correoPaciente;
    }
    set setCorreoPaciente(value) {
        this.correoPaciente = value.trim();
    }
    get getGrupoSanguineoPaciente() {
        return this.grupoSanguineoPaciente;
    }
    set setGrupoSanguineoPaciente(value) {
        this.grupoSanguineoPaciente = value.trim();
    }
    get getFechaHoraBajaPaciente() {
        return this.fechaHoraBajaPaciente;
    }
    set setFechaHoraBajaPaciente(value) {
        this.fechaHoraBajaPaciente = value;
    }
    get getTurnos() {
        return this.turnos;
    }
    set setTurnos(value) {
        this.turnos = value;
    }
    get getPacienteNotificacion() {
        return this.pacienteNotificaciones;
    }
    set setPacienteNotificacion(pacienteNotificaciones) {
        this.pacienteNotificaciones = pacienteNotificaciones;
    }
};
exports.Paciente = Paciente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Paciente.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "nombrePaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "apellidoPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Paciente.prototype, "edadPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaNacimientoPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "celularPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "correoPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Paciente.prototype, "grupoSanguineoPaciente", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Paciente.prototype, "fechaHoraBajaPaciente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.paciente, { nullable: true }),
    __metadata("design:type", Array)
], Paciente.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.pacientes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userEmail', referencedColumnName: 'emailUsuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Paciente.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paciente_notificacion_entity_1.PacienteNotificacion, (pacienteNotificacion) => pacienteNotificacion.paciente),
    __metadata("design:type", Array)
], Paciente.prototype, "pacienteNotificaciones", void 0);
exports.Paciente = Paciente = __decorate([
    (0, typeorm_1.Entity)()
], Paciente);
//# sourceMappingURL=paciente.entity.js.map