"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteModule = void 0;
const common_1 = require("@nestjs/common");
const paciente_service_1 = require("./paciente.service");
const paciente_controller_1 = require("./paciente.controller");
const paciente_entity_1 = require("./entities/paciente.entity");
const typeorm_1 = require("@nestjs/typeorm");
const turno_entity_1 = require("../turno/entities/turno.entity");
const usuario_entity_1 = require("../usuarios/entities/usuario.entity");
const usuarios_module_1 = require("../usuarios/usuarios.module");
const auth_service_1 = require("../auth/auth.service");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let PacienteModule = class PacienteModule {
};
exports.PacienteModule = PacienteModule;
exports.PacienteModule = PacienteModule = __decorate([
    (0, common_1.Module)({
        providers: [paciente_service_1.PacienteService, auth_service_1.AuthService, genericRepository_service_1.GenericRepositoryService],
        controllers: [paciente_controller_1.PacienteController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([paciente_entity_1.Paciente, turno_entity_1.Turno, usuario_entity_1.Usuario]),
            usuarios_module_1.UsuariosModule,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], PacienteModule);
//# sourceMappingURL=paciente.module.js.map