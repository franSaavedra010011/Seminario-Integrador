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
const base_entity_1 = require("./base.entity");
const paciente_entity_1 = require("./paciente.entity");
const medico_entity_1 = require("./medico.entity");
const usuario_rol_entity_1 = require("./usuario-rol.entity");
const personal_hospital_entity_1 = require("./personal-hospital.entity");
const typeorm_1 = require("typeorm");
let Usuario = class Usuario extends base_entity_1.Base {
    usernameUsuario;
    emailUsuario;
    passwordUsuario;
    paciente;
    medico;
    usuarioRoles;
    personalHospital;
};
exports.Usuario = Usuario;
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
    (0, typeorm_1.OneToOne)(() => paciente_entity_1.Paciente, (paciente) => paciente.usuario),
    __metadata("design:type", paciente_entity_1.Paciente)
], Usuario.prototype, "paciente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => medico_entity_1.Medico, (medico) => medico.usuario),
    __metadata("design:type", medico_entity_1.Medico)
], Usuario.prototype, "medico", void 0);
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