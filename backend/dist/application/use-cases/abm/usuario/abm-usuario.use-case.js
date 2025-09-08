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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbmUsuarioUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const usuario_entity_1 = require("../../../../domain/entities/usuario.entity");
const bcryptjs = require("bcryptjs");
const usuario_rol_entity_1 = require("../../../../domain/entities/usuario-rol.entity");
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("../../../../domain/entities/rol.entity");
const typeorm_2 = require("@nestjs/typeorm");
let AbmUsuarioUseCase = class AbmUsuarioUseCase {
    genericRepository;
    usuarioRolRepo;
    constructor(genericRepository, usuarioRolRepo) {
        this.genericRepository = genericRepository;
        this.usuarioRolRepo = usuarioRolRepo;
    }
    async crear(dto) {
        const existente = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [
            { atributo: 'emailUsuario', operacion: '=', valor: dto.emailUsuario },
        ]);
        if (existente.length > 0) {
            throw new common_1.BadRequestException('El email ya está registrado');
        }
        const passwordHasheado = await bcryptjs.hash(dto.passwordUsuario, 10);
        const usuario = new usuario_entity_1.Usuario();
        usuario.usernameUsuario = dto.usernameUsuario;
        usuario.emailUsuario = dto.emailUsuario;
        usuario.passwordUsuario = passwordHasheado;
        const usuarioGuardado = await this.genericRepository.guardarCambios(usuario_entity_1.Usuario, usuario);
        for (const idRol of dto.idRoles) {
            const roles = await this.genericRepository.buscar(rol_entity_1.Rol, 'rol', [
                { atributo: 'id', operacion: '=', valor: idRol },
            ]);
            if (!roles.length) {
                throw new common_1.BadRequestException(`Rol con ID ${idRol} no existe`);
            }
            const usuarioRol = this.usuarioRolRepo.create({
                usuario: usuarioGuardado,
                rol: roles[0],
                fechaDesde: new Date(),
            });
            await this.usuarioRolRepo.save(usuarioRol);
        }
        return usuarioGuardado;
    }
    async actualizar(id, dto) {
        const usuarios = await this.genericRepository.buscar(usuario_entity_1.Usuario, 'usuario', [
            { atributo: 'id', operacion: '=', valor: id },
        ]);
        if (!usuarios.length) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        const usuario = usuarios[0];
        if (dto.passwordUsuario) {
            dto.passwordUsuario = await bcryptjs.hash(dto.passwordUsuario, 10);
        }
        Object.assign(usuario, dto);
        const usuarioActualizado = await this.genericRepository.guardarCambios(usuario_entity_1.Usuario, usuario);
        if (dto.idRolesAAgregar?.length) {
            for (const idRol of dto.idRolesAAgregar) {
                const roles = await this.genericRepository.buscar(rol_entity_1.Rol, 'rol', [
                    { atributo: 'id', operacion: '=', valor: idRol },
                ]);
                if (!roles.length) {
                    throw new common_1.BadRequestException(`Rol con ID ${idRol} no existe`);
                }
                const existente = await this.genericRepository.buscar(usuario_rol_entity_1.UsuarioRol, 'usuarioRol', [
                    { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
                    { atributo: 'rol', operacion: 'relacion', valor: idRol },
                ]);
                if (!existente.length) {
                    const usuarioRol = new usuario_rol_entity_1.UsuarioRol();
                    usuarioRol.usuario = usuarioActualizado;
                    usuarioRol.rol = roles[0];
                    usuarioRol.fechaDesde = new Date();
                    await this.genericRepository.guardarCambios(usuario_rol_entity_1.UsuarioRol, usuarioRol);
                }
            }
        }
        if (dto.idRolesAEliminar?.length) {
            for (const idRol of dto.idRolesAEliminar) {
                const relaciones = await this.genericRepository.buscar(usuario_rol_entity_1.UsuarioRol, 'usuarioRol', [
                    { atributo: 'usuario', operacion: 'relacion', valor: usuario.id },
                    { atributo: 'rol', operacion: 'relacion', valor: idRol },
                ]);
                for (const rel of relaciones) {
                    await this.genericRepository.eliminar(usuario_rol_entity_1.UsuarioRol, rel.id);
                    rel.fechaHasta = new Date();
                    await this.genericRepository.guardarCambios(usuario_rol_entity_1.UsuarioRol, rel);
                }
            }
        }
        return usuarioActualizado;
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(usuario_entity_1.Usuario, id);
    }
};
exports.AbmUsuarioUseCase = AbmUsuarioUseCase;
exports.AbmUsuarioUseCase = AbmUsuarioUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_rol_entity_1.UsuarioRol)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_1.Repository])
], AbmUsuarioUseCase);
//# sourceMappingURL=abm-usuario.use-case.js.map