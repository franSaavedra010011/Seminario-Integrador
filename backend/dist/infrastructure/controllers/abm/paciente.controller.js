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
exports.PacienteController = void 0;
const common_1 = require("@nestjs/common");
const paciente_entity_1 = require("./../../../domain/entities/paciente.entity");
const abm_paciente_use_case_1 = require("../../../application/use-cases/abm/paciente/abm-paciente.use-case");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const abm_base_controller_1 = require("./abm-base.controller");
let PacienteController = class PacienteController extends abm_base_controller_1.AbmBaseController {
    constructor(abmPacienteUseCase, genericRepositoryService) {
        super(abmPacienteUseCase, genericRepositoryService, paciente_entity_1.Paciente);
    }
};
exports.PacienteController = PacienteController;
exports.PacienteController = PacienteController = __decorate([
    (0, common_1.Controller)('paciente'),
    __metadata("design:paramtypes", [abm_paciente_use_case_1.AbmPacienteUseCase,
        genericRepository_service_1.GenericRepositoryService])
], PacienteController);
//# sourceMappingURL=paciente.controller.js.map