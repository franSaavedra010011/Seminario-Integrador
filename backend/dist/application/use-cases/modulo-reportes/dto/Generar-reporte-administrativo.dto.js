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
exports.GenerarReporteAdministrativo = void 0;
const class_validator_1 = require("class-validator");
const generar_reporte_administrativo_2dopaso_mensaje_cantidades_dto_1 = require("./generar-reporte-administrativo-2dopaso-mensaje-cantidades.dto");
class GenerarReporteAdministrativo {
    cantidadCongestion;
    cantidadEspecialidad;
}
exports.GenerarReporteAdministrativo = GenerarReporteAdministrativo;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", generar_reporte_administrativo_2dopaso_mensaje_cantidades_dto_1.GenerarReporteAdministrativo2doPasoMensajeCantidades)
], GenerarReporteAdministrativo.prototype, "cantidadCongestion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], GenerarReporteAdministrativo.prototype, "cantidadEspecialidad", void 0);
//# sourceMappingURL=Generar-reporte-administrativo.dto.js.map