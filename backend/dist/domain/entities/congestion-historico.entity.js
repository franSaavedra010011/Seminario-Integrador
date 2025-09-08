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
const hospital_entity_1 = require("./hospital.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let CongestionHistorico = class CongestionHistorico extends base_entity_1.Base {
    fecha;
    horaActualizacion;
    turnosCancelados;
    turnosNoAsistidos;
    turnosAsistidos;
    turnosMaximoDia;
    hospital;
};
exports.CongestionHistorico = CongestionHistorico;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CongestionHistorico.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "horaActualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosCancelados", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosNoAsistidos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosAsistidos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionHistorico.prototype, "turnosMaximoDia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.congestionesHistorico),
    (0, typeorm_1.JoinColumn)({ name: 'idHospital' }),
    __metadata("design:type", hospital_entity_1.Hospital)
], CongestionHistorico.prototype, "hospital", void 0);
exports.CongestionHistorico = CongestionHistorico = __decorate([
    (0, typeorm_1.Entity)()
], CongestionHistorico);
//# sourceMappingURL=congestion-historico.entity.js.map