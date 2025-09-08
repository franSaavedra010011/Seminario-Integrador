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
const base_entity_1 = require("./base.entity");
const turno_entity_1 = require("./turno.entity");
const usuario_entity_1 = require("./usuario.entity");
const paciente_notificacion_entity_1 = require("./paciente-notificacion.entity");
const localidad_entity_1 = require("./localidad.entity");
let Paciente = class Paciente extends base_entity_1.Base {
    nombrePaciente;
    apellidoPaciente;
    edadPaciente;
    fechaNacimientoPaciente;
    celularPaciente;
    correoPaciente;
    grupoSanguineoPaciente;
    turnos;
    usuario;
    pacienteNotificaciones;
    localidad;
};
exports.Paciente = Paciente;
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
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.paciente, { nullable: true }),
    __metadata("design:type", Array)
], Paciente.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.paciente, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userEmail', referencedColumnName: 'emailUsuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Paciente.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paciente_notificacion_entity_1.PacienteNotificacion, (pacienteNotificacion) => pacienteNotificacion.paciente),
    __metadata("design:type", Array)
], Paciente.prototype, "pacienteNotificaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, { nullable: false }),
    __metadata("design:type", localidad_entity_1.Localidad)
], Paciente.prototype, "localidad", void 0);
exports.Paciente = Paciente = __decorate([
    (0, typeorm_1.Entity)()
], Paciente);
//# sourceMappingURL=paciente.entity.js.map