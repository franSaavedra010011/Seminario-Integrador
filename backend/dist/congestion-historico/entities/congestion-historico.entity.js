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
exports.CongestionHistorico = void 0;
const hospital_entity_1 = require("../../hospital/entities/hospital.entity");
const typeorm_1 = require("typeorm");
let CongestionHistorico = class CongestionHistorico {
    idCongestionHistorico;
    fechaCongestionHistorico;
    horaActualizacionCongestionHistorico;
    turnosCanceladosCongestionHistorico;
    turnosNoAsistidosCongestionHistorico;
    turnosAsistidosCongestionHistorico;
    turnosMaximoDiaCongestionHistorico;
    fechaHoraBajaCongestionHistorico;
    hospital;
    get getIdCongestionHistorico() {
        return this.idCongestionHistorico;
    }
    get getFechaCongestionHistorico() {
        return this.fechaCongestionHistorico;
    }
    set setFechaCongestionHistorico(fechaCongestionHistorico) {
        this.fechaCongestionHistorico = fechaCongestionHistorico;
    }
    get getHoraActualizacionCongestionHistorico() {
        return this.horaActualizacionCongestionHistorico;
    }
    set setHoraActualizacionCongestionHistorico(horaActualizacionCongestionHistorico) {
        this.horaActualizacionCongestionHistorico =
            horaActualizacionCongestionHistorico;
    }
    get getTurnosCanceladosCongestionHistorico() {
        return this.turnosCanceladosCongestionHistorico;
    }
    set setTurnosCanceladosCongestionHistorico(turnosCanceladosCongestionHistorico) {
        this.turnosCanceladosCongestionHistorico =
            turnosCanceladosCongestionHistorico;
    }
    get getTurnosNoAsistidosCongestionHistorico() {
        return this.turnosNoAsistidosCongestionHistorico;
    }
    set setTurnosNoAsistidosCongestionHistorico(turnosNoAsistidosCongestionHistorico) {
        this.turnosNoAsistidosCongestionHistorico =
            turnosNoAsistidosCongestionHistorico;
    }
    get getTurnosAsistidosCongestionHistorico() {
        return this.turnosAsistidosCongestionHistorico;
    }
    set setTurnosAsistidosCongestionHistorico(turnosAsistidosCongestionHistorico) {
        this.turnosAsistidosCongestionHistorico =
            turnosAsistidosCongestionHistorico;
    }
    get getTurnosMaximoDiaCongestionHistorico() {
        return this.turnosMaximoDiaCongestionHistorico;
    }
    set setTurnosMaximoDiaCongestionHistorico(turnosMaximoDiaCongestionHistorico) {
        this.turnosMaximoDiaCongestionHistorico =
            turnosMaximoDiaCongestionHistorico;
    }
    get getFechaHoraBajaCongestionHistorico() {
        return this.fechaHoraBajaCongestionHistorico;
    }
    set setFechaHoraBajaCongestionHistorico(fechaHoraBajaCongestionHistorico) {
        this.fechaHoraBajaCongestionHistorico = fechaHoraBajaCongestionHistorico;
    }
};
exports.CongestionHistorico = CongestionHistorico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "idCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CongestionHistorico.prototype, "fechaCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "horaActualizacionCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosCanceladosCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosNoAsistidosCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosAsistidosCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosMaximoDiaCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], CongestionHistorico.prototype, "fechaHoraBajaCongestionHistorico", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.congestionesHistorico),
    __metadata("design:type", hospital_entity_1.Hospital)
], CongestionHistorico.prototype, "hospital", void 0);
exports.CongestionHistorico = CongestionHistorico = __decorate([
    (0, typeorm_1.Entity)()
], CongestionHistorico);
//# sourceMappingURL=congestion-historico.entity.js.map