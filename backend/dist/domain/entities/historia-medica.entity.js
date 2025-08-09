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
exports.HistoriaMedica = void 0;
const medico_entity_1 = require("./medico.entity");
const turno_entity_1 = require("./turno.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let HistoriaMedica = class HistoriaMedica extends base_entity_1.Base {
    fecha;
    observaciones;
    turno;
    medico;
};
exports.HistoriaMedica = HistoriaMedica;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HistoriaMedica.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistoriaMedica.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => turno_entity_1.Turno, (turno) => turno.historiasMedica),
    (0, typeorm_1.JoinColumn)({ name: 'idTurno' }),
    __metadata("design:type", turno_entity_1.Turno)
], HistoriaMedica.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medico_entity_1.Medico, (medico) => medico.historiasMedica),
    (0, typeorm_1.JoinColumn)({ name: 'idMedico' }),
    __metadata("design:type", medico_entity_1.Medico)
], HistoriaMedica.prototype, "medico", void 0);
exports.HistoriaMedica = HistoriaMedica = __decorate([
    (0, typeorm_1.Entity)()
], HistoriaMedica);
//# sourceMappingURL=historia-medica.entity.js.map