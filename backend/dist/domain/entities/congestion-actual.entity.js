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
const base_entity_1 = require("./base.entity");
const nivel_congestion_enum_1 = require("../enums/nivel-congestion.enum");
let CongestionActual = class CongestionActual extends base_entity_1.Base {
    fecha;
    horaActualizacion;
    nivelCongestion;
    turnosCancelados;
    turnosNoAsistidos;
    turnosAsistidos;
    turnosEnProceso;
    hospital;
};
exports.CongestionActual = CongestionActual;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], CongestionActual.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "horaActualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: nivel_congestion_enum_1.NivelCongestionEnum,
        default: 'BAJA',
    }),
    __metadata("design:type", String)
], CongestionActual.prototype, "nivelCongestion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosCancelados", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosNoAsistidos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosAsistidos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CongestionActual.prototype, "turnosEnProceso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.congestionesActual),
    (0, typeorm_1.JoinColumn)({ name: 'idHospital' }),
    __metadata("design:type", hospital_entity_1.Hospital)
], CongestionActual.prototype, "hospital", void 0);
exports.CongestionActual = CongestionActual = __decorate([
    (0, typeorm_1.Entity)()
], CongestionActual);
//# sourceMappingURL=congestion-actual.entity.js.map