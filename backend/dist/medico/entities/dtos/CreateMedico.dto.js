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
exports.MedicoDTO = void 0;
const class_validator_1 = require("class-validator");
class MedicoDTO {
    nombreMedico;
    apellidoMedico;
    dniMedico;
    telefonoMedico;
    matriculaMedico;
    tiempoConsultaMedico;
    idHospital;
    especialidades;
}
exports.MedicoDTO = MedicoDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicoDTO.prototype, "nombreMedico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicoDTO.prototype, "apellidoMedico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicoDTO.prototype, "dniMedico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicoDTO.prototype, "telefonoMedico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MedicoDTO.prototype, "matriculaMedico", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MedicoDTO.prototype, "tiempoConsultaMedico", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MedicoDTO.prototype, "idHospital", void 0);
//# sourceMappingURL=CreateMedico.dto.js.map