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
exports.GenerarReporteAdministrativo2doPasoCantidades = void 0;
const class_validator_1 = require("class-validator");
class GenerarReporteAdministrativo2doPasoCantidades {
    turnosCanceladosCA;
    turnosNoAsistidosCA;
    turnosAsistidosCA;
    turnosEnProceso;
    fechaCongestion;
}
exports.GenerarReporteAdministrativo2doPasoCantidades = GenerarReporteAdministrativo2doPasoCantidades;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenerarReporteAdministrativo2doPasoCantidades.prototype, "turnosCanceladosCA", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenerarReporteAdministrativo2doPasoCantidades.prototype, "turnosNoAsistidosCA", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenerarReporteAdministrativo2doPasoCantidades.prototype, "turnosAsistidosCA", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GenerarReporteAdministrativo2doPasoCantidades.prototype, "turnosEnProceso", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], GenerarReporteAdministrativo2doPasoCantidades.prototype, "fechaCongestion", void 0);
//# sourceMappingURL=generar-reporte-administrativo-2dopaso-cantidades.dto.js.map