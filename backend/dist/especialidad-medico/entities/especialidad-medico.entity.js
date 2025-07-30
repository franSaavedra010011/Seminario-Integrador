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
exports.EspecialidadMedico = void 0;
const especialidad_entity_1 = require("../../domain/entities/especialidad.entity");
const medico_entity_1 = require("../../medico/entities/medico.entity");
const typeorm_1 = require("typeorm");
let EspecialidadMedico = class EspecialidadMedico {
    idEspecialidadMedico;
    fechaDesdeEspecialidadMedico;
    fechaHastaEspecialidadMedico;
    especialidad;
    medico;
    get getIdEspecialidadMedico() {
        return this.idEspecialidadMedico;
    }
    get getFechaDesdeEspecialidadMedico() {
        return this.fechaDesdeEspecialidadMedico;
    }
    set setFechaDesdeEspecialidadMedico(fechaDesdeEspecialidadMedico) {
        this.fechaDesdeEspecialidadMedico = fechaDesdeEspecialidadMedico;
    }
    get getFechaHastaEspecialidadMedico() {
        return this.fechaHastaEspecialidadMedico;
    }
    set setFechaHastaEspecialidadMedico(fechaHastaEspecialidadMedico) {
        this.fechaHastaEspecialidadMedico = fechaHastaEspecialidadMedico;
    }
    get getMedico() {
        return this.medico;
    }
    setMedico(medico) {
        this.medico = medico;
    }
    setEspecialidad(especialidad) {
        this.especialidad = especialidad;
    }
};
exports.EspecialidadMedico = EspecialidadMedico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EspecialidadMedico.prototype, "idEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EspecialidadMedico.prototype, "fechaDesdeEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EspecialidadMedico.prototype, "fechaHastaEspecialidadMedico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => especialidad_entity_1.Especialidad, (especialidad) => especialidad.especialidadesMedico),
    __metadata("design:type", especialidad_entity_1.Especialidad)
], EspecialidadMedico.prototype, "especialidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.especialidadesMedico),
    __metadata("design:type", medico_entity_1.Medico)
], EspecialidadMedico.prototype, "medico", void 0);
exports.EspecialidadMedico = EspecialidadMedico = __decorate([
    (0, typeorm_1.Entity)()
], EspecialidadMedico);
//# sourceMappingURL=especialidad-medico.entity.js.map