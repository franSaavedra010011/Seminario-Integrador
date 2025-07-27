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
const turno_entity_1 = require("../../turno/entities/turno.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const especialidad_medico_entity_1 = require("../../especialidad-medico/entities/especialidad-medico.entity");
const historia_medica_entity_1 = require("../../historia-medica/entities/historia-medica.entity");
const hospital_especialidad_medico_entity_1 = require("../../hospital-especialidad-medico/entities/hospital-especialidad-medico.entity");
let Medico = class Medico {
    idMedico;
    nombreMedico;
    apellidoMedico;
    dniMedico;
    telMedico;
    matriculaMedico;
    tiempoConsulta;
    fechaHoraBajaMedico;
    fechaHastaMedico;
    turnos;
    usuario;
    especialidadesMedico;
    historiasMedica;
    hospitalEspecialidadMedico;
    get getIdMedico() {
        return this.idMedico;
    }
    get getNombreMedico() {
        return this.nombreMedico;
    }
    set setNombreMedico(nombreMedico) {
        this.nombreMedico = nombreMedico;
    }
    get getApellidoMedico() {
        return this.apellidoMedico;
    }
    set setApellidoMedico(apellidoMedico) {
        this.apellidoMedico = apellidoMedico;
    }
    get getDniMedico() {
        return this.dniMedico;
    }
    set setDniMedico(dniMedico) {
        this.dniMedico = dniMedico;
    }
    get getTelMedico() {
        return this.telMedico;
    }
    set setTelMedico(telMedico) {
        this.telMedico = telMedico;
    }
    get getMatriculaMedico() {
        return this.matriculaMedico;
    }
    set setMatriculaMedico(matriculaMedico) {
        this.matriculaMedico = matriculaMedico;
    }
    get getTiempoConsulta() {
        return this.tiempoConsulta;
    }
    set setTiempoConsulta(tiempoConsulta) {
        this.tiempoConsulta = tiempoConsulta;
    }
    get getFechaHoraBajaMedico() {
        return this.fechaHoraBajaMedico;
    }
    set setFechaHoraBajaMedico(fechaHoraBajaMedico) {
        this.fechaHoraBajaMedico = fechaHoraBajaMedico;
    }
    get getFechaHastaMedico() {
        return this.fechaHastaMedico;
    }
    set setFechaHastaMedico(fechaHastaMedico) {
        this.fechaHastaMedico = fechaHastaMedico;
    }
};
exports.Medico = Medico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Medico.prototype, "idMedico", void 0);
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
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Medico.prototype, "fechaHoraBajaMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Medico.prototype, "fechaHastaMedico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.paciente),
    __metadata("design:type", Array)
], Medico.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.medicos),
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