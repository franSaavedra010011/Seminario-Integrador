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
exports.ConsultarTurnosHistorialDTO = void 0;
const class_validator_1 = require("class-validator");
class ConsultarTurnosHistorialDTO {
    fechaTurno;
    fechaBajaTurno;
    presentismo;
    observaciones;
    nombreHospital;
    nombreEspecialidad;
    nombreMedico;
    apellidoMedico;
}
exports.ConsultarTurnosHistorialDTO = ConsultarTurnosHistorialDTO;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ConsultarTurnosHistorialDTO.prototype, "fechaTurno", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ConsultarTurnosHistorialDTO.prototype, "fechaBajaTurno", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], ConsultarTurnosHistorialDTO.prototype, "presentismo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConsultarTurnosHistorialDTO.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConsultarTurnosHistorialDTO.prototype, "nombreHospital", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConsultarTurnosHistorialDTO.prototype, "nombreEspecialidad", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConsultarTurnosHistorialDTO.prototype, "nombreMedico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConsultarTurnosHistorialDTO.prototype, "apellidoMedico", void 0);
//# sourceMappingURL=consultar-turnos-historial.dto.js.map