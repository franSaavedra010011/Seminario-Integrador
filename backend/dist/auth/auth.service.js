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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usuariosService;
    jwtService;
    constructor(usuariosService, jwtService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
    }
    async register({ usernameUsuario, emailUsuario, passwordUsuario, rol, }) {
        const usuario = await this.usuariosService.findOneByEmail(emailUsuario);
        if (usuario) {
            throw new common_1.BadRequestException('Usuario ya existente');
        }
        return await this.usuariosService.create({
            usernameUsuario,
            emailUsuario,
            passwordUsuario: await bcryptjs.hash(passwordUsuario, 10),
            rol,
        });
    }
    async login({ email, password }) {
        const usuario = await this.usuariosService.findOneByEmailWithPassword(email);
        if (!usuario) {
            throw new common_1.UnauthorizedException('El email ingresado no coincide con ningun email registrado');
        }
        const isPasswordValid = await bcryptjs.compare(password, usuario.passwordUsuario);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('La contraseña ingresada es incorrecta');
        }
        const usuarioRoles = usuario.getUsuarioRoles();
        let rol = '';
        for (const usuarioRol of usuarioRoles) {
            const fechaBaja = usuarioRol.fechaHastaUsuarioRol;
            if (fechaBaja === null) {
                rol = usuarioRol.getRol.getNombreRol;
            }
        }
        const payload = {
            username: usuario.usernameUsuario,
            email: usuario.emailUsuario,
            sub: usuario.idUsuario,
            role: rol,
        };
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '15m',
        });
        return {
            token,
            email,
        };
    }
    async profile({ email, role }) {
        if (role !== 'admin') {
            throw new common_1.UnauthorizedException('No tiene las credenciales para acceder a esta ruta');
        }
        return await this.usuariosService.findOneByEmailWithPassword(email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map