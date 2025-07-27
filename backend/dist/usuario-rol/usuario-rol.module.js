"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRolModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_rol_service_1 = require("./usuario-rol.service");
const usuario_rol_entity_1 = require("./entities/usuario-rol.entity");
let UsuarioRolModule = class UsuarioRolModule {
};
exports.UsuarioRolModule = UsuarioRolModule;
exports.UsuarioRolModule = UsuarioRolModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([usuario_rol_entity_1.UsuarioRol])],
        providers: [usuario_rol_service_1.UsuarioRolService],
        exports: [usuario_rol_service_1.UsuarioRolService],
    })
], UsuarioRolModule);
//# sourceMappingURL=usuario-rol.module.js.map