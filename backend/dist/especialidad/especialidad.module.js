"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadModule = void 0;
const common_1 = require("@nestjs/common");
const especialidad_service_1 = require("./especialidad.service");
const especialidad_controller_1 = require("./especialidad.controller");
const especialidad_entity_1 = require("./entities/especialidad.entity");
const medico_entity_1 = require("../medico/entities/medico.entity");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let EspecialidadModule = class EspecialidadModule {
};
exports.EspecialidadModule = EspecialidadModule;
exports.EspecialidadModule = EspecialidadModule = __decorate([
    (0, common_1.Module)({
        providers: [especialidad_service_1.EspecialidadService, genericRepository_service_1.GenericRepositoryService],
        controllers: [especialidad_controller_1.EspecialidadController],
        imports: [typeorm_1.TypeOrmModule.forFeature([especialidad_entity_1.Especialidad, medico_entity_1.Medico])],
        exports: [typeorm_1.TypeOrmModule],
    })
], EspecialidadModule);
//# sourceMappingURL=especialidad.module.js.map