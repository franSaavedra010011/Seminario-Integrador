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
exports.EstadoTurno = void 0;
const turno_estado_entity_1 = require("./turno-estado.entity");
const turno_entity_1 = require("src/turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let EstadoTurno = class EstadoTurno {
    idEstadoTurno;
    nombreEstadoTurno;
    fechaHoraBajaEstadoTurno;
    turno;
    turnosEstados;
    get getIdEstadoTurno() {
        return this.idEstadoTurno;
    }
    get getNombreEstadoTurno() {
        return this.nombreEstadoTurno;
    }
    set setNombreEstadoTurno(nombreEstadoTurno) {
        this.nombreEstadoTurno = nombreEstadoTurno;
    }
    get getFechaHoraBajaEstadoTurno() {
        return this.fechaHoraBajaEstadoTurno;
    }
    set setFechaHoraBajaEstadoTurno(fechaHoraBajaEstadoTurno) {
        this.fechaHoraBajaEstadoTurno = fechaHoraBajaEstadoTurno;
    }
};
exports.EstadoTurno = EstadoTurno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EstadoTurno.prototype, "idEstadoTurno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EstadoTurno.prototype, "nombreEstadoTurno", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], EstadoTurno.prototype, "fechaHoraBajaEstadoTurno", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => turno_entity_1.Turno, (turno) => turno.estadoTurno),
    __metadata("design:type", typeof (_a = typeof turno_entity_1.Turno !== "undefined" && turno_entity_1.Turno) === "function" ? _a : Object)
], EstadoTurno.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_estado_entity_1.TurnoEstado, (turnoEstado) => turnoEstado.estadoTurno),
    __metadata("design:type", Array)
], EstadoTurno.prototype, "turnosEstados", void 0);
exports.EstadoTurno = EstadoTurno = __decorate([
    (0, typeorm_1.Entity)()
], EstadoTurno);
//# sourceMappingURL=estado-turno.entity.js.map