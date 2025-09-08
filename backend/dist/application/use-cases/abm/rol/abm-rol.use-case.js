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
exports.AbmRolUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const rol_entity_1 = require("../../../../domain/entities/rol.entity");
const permiso_entity_1 = require("../../../../domain/entities/permiso.entity");
const rol_permiso_entity_1 = require("../../../../domain/entities/rol-permiso.entity");
const typeorm_2 = require("typeorm");
let AbmRolUseCase = class AbmRolUseCase {
    rolPermisoRepo;
    genericRepository;
    constructor(rolPermisoRepo, genericRepository) {
        this.rolPermisoRepo = rolPermisoRepo;
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const permisos = [];
        for (const idPermiso of dto.idPermisos) {
            const encontrados = await this.genericRepository.buscar(permiso_entity_1.Permiso, 'permiso', [
                { atributo: 'id', operacion: '=', valor: idPermiso },
            ]);
            if (!encontrados.length) {
                throw new common_1.BadRequestException(`Permiso con ID ${idPermiso} no existe`);
            }
            permisos.push(encontrados[0]);
        }
        const nuevoRol = new rol_entity_1.Rol();
        nuevoRol.nombre = dto.nombreRol;
        const rolGuardado = await this.genericRepository.guardarCambios(rol_entity_1.Rol, nuevoRol);
        for (const permiso of permisos) {
            const relacion = new rol_permiso_entity_1.RolPermiso();
            relacion.rol = rolGuardado;
            relacion.permiso = permiso;
            relacion.fechaDesde = new Date();
            await this.genericRepository.guardarCambios(rol_permiso_entity_1.RolPermiso, relacion);
        }
        return rolGuardado;
    }
    async actualizar(id, dto) {
        const roles = await this.genericRepository.buscar(rol_entity_1.Rol, 'rol', [
            { atributo: 'id', operacion: '=', valor: id },
        ]);
        if (!roles.length || roles[0].fechaHoraBaja) {
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        }
        const rol = roles[0];
        if (dto.nombreRol) {
            rol.nombre = dto.nombreRol;
        }
        const rolActualizado = await this.genericRepository.guardarCambios(rol_entity_1.Rol, rol);
        if (dto.idPermisos?.length) {
            const relaciones = await this.genericRepository.buscar(rol_permiso_entity_1.RolPermiso, 'rolPermiso', [{ atributo: 'rol', operacion: 'relacion', valor: rol.id }]);
            for (const rel of relaciones) {
                await this.genericRepository.eliminar(rol_permiso_entity_1.RolPermiso, rel.id);
                rel.fechaHasta = new Date();
                await this.genericRepository.guardarCambios(rol_permiso_entity_1.RolPermiso, rel);
            }
            for (const idPermiso of dto.idPermisos) {
                const permisos = await this.genericRepository.buscar(permiso_entity_1.Permiso, 'permiso', [
                    { atributo: 'id', operacion: '=', valor: idPermiso },
                ]);
                if (!permisos.length) {
                    throw new common_1.BadRequestException(`Permiso con ID ${idPermiso} no existe`);
                }
                const nuevaRelacion = new rol_permiso_entity_1.RolPermiso();
                nuevaRelacion.rol = rolActualizado;
                nuevaRelacion.permiso = permisos[0];
                nuevaRelacion.fechaDesde = new Date();
                await this.genericRepository.guardarCambios(rol_permiso_entity_1.RolPermiso, nuevaRelacion);
            }
        }
        return rolActualizado;
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(rol_entity_1.Rol, id);
    }
};
exports.AbmRolUseCase = AbmRolUseCase;
exports.AbmRolUseCase = AbmRolUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_permiso_entity_1.RolPermiso)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        genericRepository_service_1.GenericRepositoryService])
], AbmRolUseCase);
//# sourceMappingURL=abm-rol.use-case.js.map