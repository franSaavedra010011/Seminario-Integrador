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
exports.PacienteDto = void 0;
const class_validator_1 = require("class-validator");
class PacienteDto {
    nombrePaciente;
    apellidoPaciente;
    dniPaciente;
    edadPaciente;
    fechaNacimientoPaciente;
    celularPaciente;
    correoPaciente;
    grupoSanguineoPaciente;
}
exports.PacienteDto = PacienteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "nombrePaciente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "apellidoPaciente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "dniPaciente", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PacienteDto.prototype, "edadPaciente", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "fechaNacimientoPaciente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "celularPaciente", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "correoPaciente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PacienteDto.prototype, "grupoSanguineoPaciente", void 0);
//# sourceMappingURL=createPaciente.dto.js.map