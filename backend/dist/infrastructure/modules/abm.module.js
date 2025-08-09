"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../domain/entities/usuario.entity");
const usuario_rol_entity_1 = require("../../domain/entities/usuario-rol.entity");
const rol_entity_1 = require("../../domain/entities/rol.entity");
const permiso_entity_1 = require("../../domain/entities/permiso.entity");
const rol_permiso_entity_1 = require("../../domain/entities/rol-permiso.entity");
const paciente_entity_1 = require("../../domain/entities/paciente.entity");
const medico_entity_1 = require("../../domain/entities/medico.entity");
const hospital_entity_1 = require("../../domain/entities/hospital.entity");
const especialidad_entity_1 = require("../../domain/entities/especialidad.entity");
const estado_turno_entity_1 = require("../../domain/entities/estado-turno.entity");
const abm_usuario_use_case_1 = require("../../application/use-cases/abm/usuario/abm-usuario.use-case");
const abm_rol_use_case_1 = require("../../application/use-cases/abm/rol/abm-rol.use-case");
const abm_permiso_use_case_1 = require("../../application/use-cases/abm/permiso/abm-permiso.use-case");
const abm_paciente_use_case_1 = require("../../application/use-cases/abm/paciente/abm-paciente.use-case");
const abm_medico_use_case_1 = require("../../application/use-cases/abm/medico/abm-medico.use-case");
const abm_hospital_use_case_1 = require("../../application/use-cases/abm/hospital/abm-hospital.use-case");
const abm_especialidad_use_case_1 = require("../../application/use-cases/abm/especialidad/abm-especialidad.use-case");
const abm_estado_turno_use_case_1 = require("../../application/use-cases/abm/estado-turno/abm-estado-turno.use-case");
const genericRepository_service_1 = require("../../shared/utils/genericRepository.service");
const especialidad_medico_entity_1 = require("../../domain/entities/especialidad-medico.entity");
const hospital_especialidad_medico_entity_1 = require("../../domain/entities/hospital-especialidad-medico.entity");
const hospital_especialidad_entity_1 = require("../../domain/entities/hospital-especialidad.entity");
let AbmModule = class AbmModule {
};
exports.AbmModule = AbmModule;
exports.AbmModule = AbmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                usuario_entity_1.Usuario,
                usuario_rol_entity_1.UsuarioRol,
                rol_entity_1.Rol,
                permiso_entity_1.Permiso,
                rol_permiso_entity_1.RolPermiso,
                paciente_entity_1.Paciente,
                medico_entity_1.Medico,
                hospital_entity_1.Hospital,
                especialidad_medico_entity_1.EspecialidadMedico,
                hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico,
                hospital_especialidad_entity_1.HospitalEspecialidad,
                especialidad_entity_1.Especialidad,
                estado_turno_entity_1.EstadoTurno
            ])
        ],
        providers: [
            genericRepository_service_1.GenericRepositoryService,
            abm_usuario_use_case_1.AbmUsuarioUseCase,
            abm_rol_use_case_1.AbmRolUseCase,
            abm_permiso_use_case_1.AbmPermisoUseCase,
            abm_paciente_use_case_1.AbmPacienteUseCase,
            abm_medico_use_case_1.AbmMedicoUseCase,
            abm_hospital_use_case_1.AbmHospitalUseCase,
            abm_especialidad_use_case_1.AbmEspecialidadUseCase,
            abm_estado_turno_use_case_1.AbmEstadoTurnoUseCase
        ],
        exports: [
            abm_usuario_use_case_1.AbmUsuarioUseCase,
            abm_rol_use_case_1.AbmRolUseCase,
            abm_permiso_use_case_1.AbmPermisoUseCase,
            abm_paciente_use_case_1.AbmPacienteUseCase,
            abm_medico_use_case_1.AbmMedicoUseCase,
            abm_hospital_use_case_1.AbmHospitalUseCase,
            abm_especialidad_use_case_1.AbmEspecialidadUseCase,
            abm_estado_turno_use_case_1.AbmEstadoTurnoUseCase
        ]
    })
], AbmModule);
//# sourceMappingURL=abm.module.js.map