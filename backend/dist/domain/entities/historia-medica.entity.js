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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaMedica = void 0;
const medico_entity_1 = require("./medico.entity");
const turno_entity_1 = require("src/turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let HistoriaMedica = class HistoriaMedica {
    idHistoriaMedica;
    fechaHistoriaMedica;
    observacionesHistoriaMedica;
    fechaHoraBajaHistoriaMedica;
    turno;
    medico;
    get getIdHistoriaMedica() {
        return this.idHistoriaMedica;
    }
    get getFechaHistoriaMedica() {
        return this.fechaHistoriaMedica;
    }
    set setFechaHistoriaMedica(fechaHistoriaMedica) {
        this.fechaHistoriaMedica = fechaHistoriaMedica;
    }
    get getObservacionesHistoriaMedica() {
        return this.observacionesHistoriaMedica;
    }
    set setObservacionesHistoriaMedica(observacionesHistoriaMedica) {
        this.observacionesHistoriaMedica = observacionesHistoriaMedica.trim();
    }
    get getFechaHoraBajaHistoriaMedica() {
        return this.fechaHoraBajaHistoriaMedica;
    }
    set setFechaHoraBajaHistoriaMedica(fechaHoraBajaHistoriaMedica) {
        this.fechaHoraBajaHistoriaMedica = fechaHoraBajaHistoriaMedica;
    }
    get getMedico() {
        return this.medico;
    }
    set setMedico(value) {
        this.medico = value;
    }
};
exports.HistoriaMedica = HistoriaMedica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistoriaMedica.prototype, "idHistoriaMedica", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HistoriaMedica.prototype, "fechaHistoriaMedica", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistoriaMedica.prototype, "observacionesHistoriaMedica", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], HistoriaMedica.prototype, "fechaHoraBajaHistoriaMedica", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, (turno) => turno.historiasMedica),
    __metadata("design:type", typeof (_a = typeof turno_entity_1.Turno !== "undefined" && turno_entity_1.Turno) === "function" ? _a : Object)
], HistoriaMedica.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.historiasMedica),
    __metadata("design:type", medico_entity_1.Medico)
], HistoriaMedica.prototype, "medico", void 0);
exports.HistoriaMedica = HistoriaMedica = __decorate([
    (0, typeorm_1.Entity)()
], HistoriaMedica);
//# sourceMappingURL=historia-medica.entity.js.map