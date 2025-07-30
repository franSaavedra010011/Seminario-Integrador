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
exports.CongestionActual = void 0;
const hospital_entity_1 = require("./hospital.entity");
const typeorm_1 = require("typeorm");
let CongestionActual = class CongestionActual {
    idCongestionActual;
    fechaCongestionActual;
    horaActualizacionCongestionActual;
    turnosCanceladosCongestionActual;
    turnosNoAsistidosCongestionActual;
    turnosAsistidosCongestionActual;
    turnosEnProcesoCongestionActual;
    fechaHoraBajaCongestionActual;
    hospital;
    get getIdCongestionActual() {
        return this.idCongestionActual;
    }
    get getFechaCongestionActual() {
        return this.fechaCongestionActual;
    }
    set setFechaCongestionActual(fechaCongestionActual) {
        this.fechaCongestionActual = fechaCongestionActual;
    }
    get getHoraActualizacionCongestionActual() {
        return this.horaActualizacionCongestionActual;
    }
    set setHoraActualizacionCongestionActual(horaActualizacionCongestionActual) {
        this.horaActualizacionCongestionActual = horaActualizacionCongestionActual;
    }
    get getTurnosCanceladosCongestionActual() {
        return this.turnosCanceladosCongestionActual;
    }
    set setTurnosCanceladosCongestionActual(turnosCanceladosCongestionActual) {
        this.turnosCanceladosCongestionActual = turnosCanceladosCongestionActual;
    }
    get getTurnosNoAsistidosCongestionActual() {
        return this.turnosNoAsistidosCongestionActual;
    }
    set setTurnosNoAsistidosCongestionActual(turnosNoAsistidosCongestionActual) {
        this.turnosNoAsistidosCongestionActual = turnosNoAsistidosCongestionActual;
    }
    get getTurnosAsistidosCongestionActual() {
        return this.turnosAsistidosCongestionActual;
    }
    set setTurnosAsistidosCongestionActual(turnosAsistidosCongestionActual) {
        this.turnosAsistidosCongestionActual = turnosAsistidosCongestionActual;
    }
    get getTurnosEnProcesoCongestionActual() {
        return this.turnosEnProcesoCongestionActual;
    }
    set setTurnosEnProcesoCongestionActual(turnosEnProcesoCongestionActual) {
        this.turnosEnProcesoCongestionActual = turnosEnProcesoCongestionActual;
    }
    get getFechaHoraBajaCongestionActual() {
        return this.fechaHoraBajaCongestionActual;
    }
    set setFechaHoraBajaCongestionActual(fechaHoraBajaCongestionActual) {
        this.fechaHoraBajaCongestionActual = fechaHoraBajaCongestionActual;
    }
};
exports.CongestionActual = CongestionActual;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "idCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CongestionActual.prototype, "fechaCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "horaActualizacionCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosCanceladosCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosNoAsistidosCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosAsistidosCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosEnProcesoCongestionActual", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], CongestionActual.prototype, "fechaHoraBajaCongestionActual", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.congestionesActual),
    __metadata("design:type", hospital_entity_1.Hospital)
], CongestionActual.prototype, "hospital", void 0);
exports.CongestionActual = CongestionActual = __decorate([
    (0, typeorm_1.Entity)()
], CongestionActual);
//# sourceMappingURL=congestion-actual.entity.js.map