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
const bcryptjs = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const genericRepository_service_1 = require("../shared/utils/genericRepository.service");
const abm_usuario_use_case_1 = require("../application/use-cases/abm/usuario/abm-usuario.use-case");
const rol_entity_1 = require("../domain/entities/rol.entity");
const usuario_entity_1 = require("../domain/entities/usuario.entity");
let AuthService = class AuthService {
    abmUsuarioUseCase;
    jwtService;
    genericRepository;
    constructor(abmUsuarioUseCase, jwtService, genericRepository) {
        this.abmUsuarioUseCase = abmUsuarioUseCase;
        this.jwtService = jwtService;
        this.genericRepository = genericRepository;
    }
    async register(registerDto) {
        const existente = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [
            { atributo: 'emailUsuario', operacion: '=', valor: registerDto.emailUsuario },
        ]);
        if (existente.length > 0) {
            throw new common_1.BadRequestException('Usuario ya existente');
        }
        const idRoles = [];
        for (const nombreRol of registerDto.roles) {
            const rolesEncontrados = await this.genericRepository.buscar(rol_entity_1.Rol, 'rol', [
                { atributo: 'nombre', operacion: '=', valor: nombreRol.trim() },
                { atributo: 'fechaHoraBaja', operacion: 'isNull', valor: null }
            ]);
            if (!rolesEncontrados.length) {
                throw new common_1.BadRequestException(`El rol "${nombreRol}" no existe`);
            }
            idRoles.push(rolesEncontrados[0].id);
        }
        const createUsuarioDto = {
            usernameUsuario: registerDto.usernameUsuario,
            emailUsuario: registerDto.emailUsuario,
            passwordUsuario: registerDto.passwordUsuario,
            idRoles
        };
        return await this.abmUsuarioUseCase.crear(createUsuarioDto);
    }
    async login({ email, password }) {
        const usuarios = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [{ atributo: 'emailUsuario', operacion: '=', valor: email }], ['usuarioRoles', 'usuarioRoles.rol', 'usuarioRoles.rol.rolPermisos', 'usuarioRoles.rol.rolPermisos.permiso']);
        if (!usuarios.length) {
            throw new common_1.UnauthorizedException('El email ingresado no coincide con ningún email registrado');
        }
        const usuario = usuarios[0];
        const usuarioConPassword = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [{ atributo: 'id', operacion: '=', valor: usuario.id }]);
        if (!usuarioConPassword.length) {
            throw new common_1.UnauthorizedException('No se pudo recuperar la contraseña');
        }
        const isPasswordValid = await bcryptjs.compare(password, usuarioConPassword[0].passwordUsuario);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('La contraseña ingresada es incorrecta');
        }
        const roles = (usuario.usuarioRoles || []).map(ur => ({
            idRol: ur.rol.id,
            nombreRol: ur.rol.nombre,
            permisos: (ur.rol.rolPermisos || [])
                .filter(rp => !rp.fechaHasta)
                .map(rp => rp.permiso.rutaPermiso.trim().toLowerCase())
        }));
        if (roles.length === 1) {
            const rol = roles[0];
            const payload = {
                sub: usuario.id,
                email: usuario.emailUsuario,
                rol: rol.nombreRol,
                permisos: rol.permisos
            };
            const token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
            return {
                token,
                rolSeleccionado: rol.nombreRol,
                permisos: rol.permisos
            };
        }
        return {
            usuarioId: usuario.id,
            email: usuario.emailUsuario,
            roles: roles.map(r => ({ idRol: r.idRol, nombreRol: r.nombreRol }))
        };
    }
    async seleccionarRol(usuarioId, idRol) {
        const usuarios = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [{ atributo: 'id', operacion: '=', valor: usuarioId }], ['usuarioRoles', 'usuarioRoles.rol', 'usuarioRoles.rol.rolPermisos', 'usuarioRoles.rol.rolPermisos.permiso']);
        if (!usuarios.length) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const usuario = usuarios[0];
        const usuarioRolSeleccionado = usuario.usuarioRoles.find(ur => ur.rol.id === idRol);
        if (!usuarioRolSeleccionado) {
            throw new common_1.UnauthorizedException('El rol seleccionado no pertenece al usuario');
        }
        for (const ur of usuario.usuarioRoles) {
            ur.rolActivo = ur.rol.id === idRol;
            await this.genericRepository.guardarCambios(ur.constructor, ur);
        }
        const permisos = usuarioRolSeleccionado.rol.rolPermisos
            .filter(rp => !rp.fechaHasta)
            .map(rp => rp.permiso.rutaPermiso.trim().toLowerCase());
        const payload = {
            sub: usuario.id,
            email: usuario.emailUsuario,
            rol: usuarioRolSeleccionado.rol.nombre,
            permisos
        };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        return {
            token,
            rolSeleccionado: usuarioRolSeleccionado.rol.nombre,
            permisos
        };
    }
    async profile({ email, rol, roles }) {
        const role = rol || (roles?.length ? roles[0] : undefined);
        if (role !== 'ADMIN') {
            throw new common_1.UnauthorizedException('No tiene las credenciales para acceder a esta ruta');
        }
        const usuarios = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [{ atributo: 'emailUsuario', operacion: '=', valor: email }], ['usuarioRoles', 'usuarioRoles.rol']);
        if (!usuarios.length) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return usuarios[0];
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [abm_usuario_use_case_1.AbmUsuarioUseCase,
        jwt_1.JwtService,
        genericRepository_service_1.GenericRepositoryService])
], AuthService);
//# sourceMappingURL=auth.service.js.map