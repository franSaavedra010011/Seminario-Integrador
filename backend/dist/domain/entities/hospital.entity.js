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
exports.Hospital = void 0;
const congestion_actual_entity_1 = require("./congestion-actual.entity");
const congestion_historico_entity_1 = require("./congestion-historico.entity");
const hospital_especialidad_entity_1 = require("./hospital-especialidad.entity");
const localidad_entity_1 = require("./localidad.entity");
const personal_hospital_entity_1 = require("./personal-hospital.entity");
const turno_entity_1 = require("./turno.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let Hospital = class Hospital extends base_entity_1.Base {
    nombre;
    direccion;
    email;
    telefono;
    hospitalEspecialidades;
    congestionesHistorico;
    congestionesActual;
    personalHospital;
    turnos;
    localidad;
};
exports.Hospital = Hospital;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_especialidad_entity_1.HospitalEspecialidad, (he) => he.hospital, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Hospital.prototype, "hospitalEspecialidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => congestion_historico_entity_1.CongestionHistorico, (ch) => ch.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "congestionesHistorico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => congestion_actual_entity_1.CongestionActual, (ca) => ca.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "congestionesActual", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_hospital_entity_1.PersonalHospital, (ph) => ph.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "personalHospital", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, (localidad) => localidad.hospitales),
    (0, typeorm_1.JoinColumn)({ name: 'idLocalidad' }),
    __metadata("design:type", localidad_entity_1.Localidad)
], Hospital.prototype, "localidad", void 0);
exports.Hospital = Hospital = __decorate([
    (0, typeorm_1.Entity)()
], Hospital);
//# sourceMappingURL=hospital.entity.js.map