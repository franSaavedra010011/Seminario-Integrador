"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../auth/auth.service");
const auth_controller_1 = require("../controllers/auth.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("../../auth/constants/jwt.constants");
const abm_module_1 = require("./abm.module");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../domain/entities/usuario.entity");
const rol_entity_1 = require("../../domain/entities/rol.entity");
const usuario_rol_entity_1 = require("../../domain/entities/usuario-rol.entity");
const shared_module_1 = require("./shared.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        imports: [
            abm_module_1.AbmModule,
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, rol_entity_1.Rol, usuario_rol_entity_1.UsuarioRol]),
            shared_module_1.SharedModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '15m' },
            }),
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map