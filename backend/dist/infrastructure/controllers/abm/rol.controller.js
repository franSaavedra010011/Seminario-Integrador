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
exports.RolController = void 0;
const common_1 = require("@nestjs/common");
const abm_rol_use_case_1 = require("../../../application/use-cases/abm/rol/abm-rol.use-case");
const rol_entity_1 = require("../../../domain/entities/rol.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const abm_base_controller_1 = require("./abm-base.controller");
let RolController = class RolController extends abm_base_controller_1.AbmBaseController {
    constructor(abmRolUseCase, genericRepositoryService) {
        super(abmRolUseCase, genericRepositoryService, rol_entity_1.Rol);
    }
};
exports.RolController = RolController;
exports.RolController = RolController = __decorate([
    (0, common_1.Controller)('rol'),
    __metadata("design:paramtypes", [abm_rol_use_case_1.AbmRolUseCase,
        genericRepository_service_1.GenericRepositoryService])
], RolController);
//# sourceMappingURL=rol.controller.js.map