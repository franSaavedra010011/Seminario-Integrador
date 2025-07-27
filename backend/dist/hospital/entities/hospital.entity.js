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
const congestion_actual_entity_1 = require("../../congestion-actual/entities/congestion-actual.entity");
const congestion_historico_entity_1 = require("../../congestion-historico/entities/congestion-historico.entity");
const hospital_especialidad_entity_1 = require("../../hospital-especialidad/entities/hospital-especialidad.entity");
const localidad_entity_1 = require("../../localidad/entities/localidad.entity");
const personal_hospital_entity_1 = require("../../personal-hospital/entities/personal-hospital.entity");
const turno_entity_1 = require("../../turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let Hospital = class Hospital {
    idHospital;
    nombreHospital;
    direccionHospital;
    emailHospital;
    telHospital;
    fechaHoraBajaHospital;
    hospitalEspecialidades;
    congestionesHistorico;
    localidad;
    congestionesActual;
    personalHospital;
    turnos;
    get getIdHospital() {
        return this.idHospital;
    }
    get getNombreHospital() {
        return this.nombreHospital;
    }
    set setNombreHospital(nombreHospital) {
        this.nombreHospital = nombreHospital;
    }
    get getDireccionHospital() {
        return this.direccionHospital;
    }
    set setDireccionHospital(direccionHospital) {
        this.direccionHospital = direccionHospital;
    }
    get getEmailHospital() {
        return this.emailHospital;
    }
    set setEmailHospital(emailHospital) {
        this.emailHospital = emailHospital;
    }
    get getTelHospital() {
        return this.telHospital;
    }
    set setTelHospital(telHospital) {
        this.telHospital = telHospital;
    }
    get getFechaHoraBajaHospital() {
        return this.fechaHoraBajaHospital;
    }
    setFechaHoraBajaHospital(fechaHoraBajaHospital) {
        this.fechaHoraBajaHospital = fechaHoraBajaHospital;
    }
    getHospitalEspecialidades() {
        return this.hospitalEspecialidades;
    }
    set setHospitalEspecialidades(hospitalEspecialidades) {
        this.hospitalEspecialidades = hospitalEspecialidades;
    }
    get getCongestionesHistorico() {
        return this.congestionesHistorico;
    }
    set setCongestionesHistorico(congestionesHistorico) {
        this.congestionesHistorico = congestionesHistorico;
    }
    get getLocalidad() {
        return this.localidad;
    }
    set setLocalidad(localidad) {
        this.localidad = localidad;
    }
    get getCongestionesActual() {
        return this.congestionesActual;
    }
    set setCongestionesActual(congestionesActual) {
        this.congestionesActual = congestionesActual;
    }
};
exports.Hospital = Hospital;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Hospital.prototype, "idHospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "nombreHospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "direccionHospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "emailHospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "telHospital", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Hospital.prototype, "fechaHoraBajaHospital", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_especialidad_entity_1.HospitalEspecialidad, (hospitalEspecialidad) => hospitalEspecialidad.hospital, { eager: true }),
    __metadata("design:type", Array)
], Hospital.prototype, "hospitalEspecialidades", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => congestion_historico_entity_1.CongestionHistorico, (congestionHistorico) => congestionHistorico.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "congestionesHistorico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, (localidad) => localidad.hospitales),
    __metadata("design:type", localidad_entity_1.Localidad)
], Hospital.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => congestion_actual_entity_1.CongestionActual, (congestionActual) => congestionActual.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "congestionesActual", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => personal_hospital_entity_1.PersonalHospital, (personalHospital) => personalHospital.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "personalHospital", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.hospital),
    __metadata("design:type", Array)
], Hospital.prototype, "turnos", void 0);
exports.Hospital = Hospital = __decorate([
    (0, typeorm_1.Entity)()
], Hospital);
//# sourceMappingURL=hospital.entity.js.map