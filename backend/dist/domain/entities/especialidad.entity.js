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
exports.Especialidad = void 0;
const especialidad_medico_entity_1 = require("./especialidad-medico.entity");
const hospital_especialidad_entity_1 = require("./hospital-especialidad.entity");
const turno_entity_1 = require("./turno.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let Especialidad = class Especialidad extends base_entity_1.Base {
    nombre;
    descripcion;
    turnos;
    especialidadesMedico;
    hospitalEspecialidades;
};
exports.Especialidad = Especialidad;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Especialidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Especialidad.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.especialidad),
    __metadata("design:type", Array)
], Especialidad.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => especialidad_medico_entity_1.EspecialidadMedico, (em) => em.especialidad),
    __metadata("design:type", Array)
], Especialidad.prototype, "especialidadesMedico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_especialidad_entity_1.HospitalEspecialidad, (he) => he.especialidad),
    __metadata("design:type", Array)
], Especialidad.prototype, "hospitalEspecialidades", void 0);
exports.Especialidad = Especialidad = __decorate([
    (0, typeorm_1.Entity)()
], Especialidad);
//# sourceMappingURL=especialidad.entity.js.map