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
exports.Usuario = void 0;
const paciente_entity_1 = require("../../domain/entities/paciente.entity");
const typeorm_1 = require("typeorm");
const medico_entity_1 = require("../../domain/entities/medico.entity");
const usuario_rol_entity_1 = require("../../domain/entities/usuario-rol.entity");
const personal_hospital_entity_1 = require("../../domain/entities/personal-hospital.entity");
let Usuario = class Usuario {
    idUsuario;
    usernameUsuario;
    emailUsuario;
    passwordUsuario;
    fechaHoraBajaUsuario;
    pacientes;
    medicos;
    usuarioRoles;
    personalHospital;
    getIdUsuario() {
        return this.idUsuario;
    }
    setUsernameUsuario(value) {
        this.usernameUsuario = value;
    }
    getUsernameUsuario() {
        return this.usernameUsuario;
    }
    setEmailUsuario(value) {
        this.emailUsuario = value;
    }
    getEmailUsuario() {
        return this.emailUsuario;
    }
    setPasswordUsuario(value) {
        this.passwordUsuario = value;
    }
    getPasswordUsuario() {
        return this.passwordUsuario;
    }
    setFechaHoraBajaUsuario(value) {
        this.fechaHoraBajaUsuario = value;
    }
    getFechaHoraBajaUsuario() {
        return this.fechaHoraBajaUsuario;
    }
    setPacientes(paciente) {
        this.pacientes = paciente;
    }
    getPacientes() {
        return this.pacientes;
    }
    setMedicos(medico) {
        this.medicos = medico;
    }
    getMedicos() {
        return this.medicos;
    }
    setUsuarioRoles(usuarioRoles) {
        this.usuarioRoles = usuarioRoles;
    }
    getUsuarioRoles() {
        return this.usuarioRoles;
    }
    setPersonalHospital(personal) {
        this.personalHospital = personal;
    }
    getPersonalHospital() {
        return this.personalHospital;
    }
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "usernameUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], Usuario.prototype, "emailUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, select: false }),
    __metadata("design:type", String)
], Usuario.prototype, "passwordUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "fechaHoraBajaUsuario", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.usuario),
    __metadata("design:type", paciente_entity_1.Paciente)
], Usuario.prototype, "pacientes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medico_entity_1.Medico, (medico) => medico.usuario),
    __metadata("design:type", medico_entity_1.Medico)
], Usuario.prototype, "medicos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usuario_rol_entity_1.UsuarioRol, (usuarioRol) => usuarioRol.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "usuarioRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_hospital_entity_1.PersonalHospital, (personalHospital) => personalHospital.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "personalHospital", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)()
], Usuario);
//# sourceMappingURL=usuario.entity.js.map