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
exports.TurnoEstado = void 0;
const estado_turno_entity_1 = require("./estado-turno.entity");
const turno_entity_1 = require("src/turno/entities/turno.entity");
const typeorm_1 = require("typeorm");
let TurnoEstado = class TurnoEstado {
    idTurnoEstado;
    fechaDesdeTurnoEstado;
    fechaHastaTurnoEstado;
    turno;
    estadoTurno;
    get getIdTurnoEstado() {
        return this.idTurnoEstado;
    }
    get getFechaDesdeTurnoEstado() {
        return this.fechaDesdeTurnoEstado;
    }
    set setFechaDesdeTurnoEstado(value) {
        this.fechaDesdeTurnoEstado = value;
    }
    get getFechaHastaTurnoEstado() {
        return this.fechaHastaTurnoEstado;
    }
    set setFechaHastaTurnoEstado(value) {
        this.fechaHastaTurnoEstado = value;
    }
    get getEstadoTurno() {
        return this.estadoTurno;
    }
    set setEstadoTurno(value) {
        this.estadoTurno = value;
    }
};
exports.TurnoEstado = TurnoEstado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TurnoEstado.prototype, "idTurnoEstado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TurnoEstado.prototype, "fechaDesdeTurnoEstado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TurnoEstado.prototype, "fechaHastaTurnoEstado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, (turno) => turno.turnosEstados),
    __metadata("design:type", typeof (_a = typeof turno_entity_1.Turno !== "undefined" && turno_entity_1.Turno) === "function" ? _a : Object)
], TurnoEstado.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estado_turno_entity_1.EstadoTurno, (estadoTurno) => estadoTurno.turnosEstados),
    __metadata("design:type", estado_turno_entity_1.EstadoTurno)
], TurnoEstado.prototype, "estadoTurno", void 0);
exports.TurnoEstado = TurnoEstado = __decorate([
    (0, typeorm_1.Entity)()
], TurnoEstado);
//# sourceMappingURL=turno-estado.entity.js.map