"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoModule = void 0;
const common_1 = require("@nestjs/common");
const medico_service_1 = require("./medico.service");
const medico_controller_1 = require("./medico.controller");
const medico_entity_1 = require("./entities/medico.entity");
const turno_entity_1 = require("../turno/entities/turno.entity");
const typeorm_1 = require("@nestjs/typeorm");
const hospital_entity_1 = require("../hospital/entities/hospital.entity");
const especialidad_entity_1 = require("../especialidad/entities/especialidad.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
const especialidad_medico_entity_1 = require("../especialidad-medico/entities/especialidad-medico.entity");
const hospital_especialidad_entity_1 = require("../hospital-especialidad/entities/hospital-especialidad.entity");
const hospital_especialidad_medico_entity_1 = require("../hospital-especialidad-medico/entities/hospital-especialidad-medico.entity");
let MedicoModule = class MedicoModule {
};
exports.MedicoModule = MedicoModule;
exports.MedicoModule = MedicoModule = __decorate([
    (0, common_1.Module)({
        providers: [medico_service_1.MedicoService, genericRepository_service_1.GenericRepositoryService],
        controllers: [medico_controller_1.MedicoController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                medico_entity_1.Medico,
                turno_entity_1.Turno,
                hospital_entity_1.Hospital,
                especialidad_entity_1.Especialidad,
                especialidad_medico_entity_1.EspecialidadMedico,
                hospital_especialidad_entity_1.HospitalEspecialidad,
                hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico,
            ]),
        ],
        exports: [typeorm_1.TypeOrmModule, medico_service_1.MedicoService],
    })
], MedicoModule);
//# sourceMappingURL=medico.module.js.map