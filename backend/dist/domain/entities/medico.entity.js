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
exports.Medico = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const turno_entity_1 = require("./turno.entity");
const usuario_entity_1 = require("./usuario.entity");
const especialidad_medico_entity_1 = require("./especialidad-medico.entity");
const historia_medica_entity_1 = require("./historia-medica.entity");
const hospital_especialidad_medico_entity_1 = require("./hospital-especialidad-medico.entity");
let Medico = class Medico extends base_entity_1.Base {
    nombreMedico;
    apellidoMedico;
    dniMedico;
    telMedico;
    matriculaMedico;
    tiempoConsulta;
    turnos;
    usuario;
    especialidadesMedico;
    historiasMedica;
    hospitalEspecialidadMedico;
};
exports.Medico = Medico;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medico.prototype, "nombreMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medico.prototype, "apellidoMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medico.prototype, "dniMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medico.prototype, "telMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Medico.prototype, "matriculaMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Medico.prototype, "tiempoConsulta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.paciente),
    __metadata("design:type", Array)
], Medico.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.medico),
    (0, typeorm_1.JoinColumn)({ name: 'userEmail', referencedColumnName: 'emailUsuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Medico.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => especialidad_medico_entity_1.EspecialidadMedico, (especialidadMedico) => especialidadMedico.medico),
    __metadata("design:type", Array)
], Medico.prototype, "especialidadesMedico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => historia_medica_entity_1.HistoriaMedica, (historiaMedica) => historiaMedica.medico),
    __metadata("design:type", Array)
], Medico.prototype, "historiasMedica", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico, (hospitalEspecialidadMedico) => hospitalEspecialidadMedico.medico),
    __metadata("design:type", Array)
], Medico.prototype, "hospitalEspecialidadMedico", void 0);
exports.Medico = Medico = __decorate([
    (0, typeorm_1.Entity)()
], Medico);
//# sourceMappingURL=medico.entity.js.map