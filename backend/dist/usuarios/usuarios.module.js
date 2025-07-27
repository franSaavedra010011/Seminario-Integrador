"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_controller_1 = require("./usuarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const usuario_rol_module_1 = require("../usuario-rol/usuario-rol.module");
const medico_module_1 = require("../medico/medico.module");
const usuario_rol_entity_1 = require("../usuario-rol/entities/usuario-rol.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
const paciente_module_1 = require("../paciente/paciente.module");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [usuarios_service_1.UsuariosService, genericRepository_service_1.GenericRepositoryService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, usuario_rol_entity_1.UsuarioRol]),
            (0, common_1.forwardRef)(() => usuario_rol_module_1.UsuarioRolModule),
            (0, common_1.forwardRef)(() => medico_module_1.MedicoModule),
            (0, common_1.forwardRef)(() => paciente_module_1.PacienteModule),
        ],
        exports: [usuarios_service_1.UsuariosService, typeorm_1.TypeOrmModule],
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map