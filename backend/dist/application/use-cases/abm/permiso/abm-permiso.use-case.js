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
exports.AbmPermisoUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const permiso_entity_1 = require("../../../../domain/entities/permiso.entity");
let AbmPermisoUseCase = class AbmPermisoUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const duplicados = await this.genericRepository.buscar(permiso_entity_1.Permiso, 'permiso', [{ atributo: 'rutaPermiso', operacion: '=', valor: dto.rutaPermiso }]);
        if (duplicados.some(p => p.rutaPermiso.trim().toLowerCase() === dto.rutaPermiso.trim().toLowerCase())) {
            throw new common_1.BadRequestException(`El permiso con ruta "${dto.rutaPermiso}" ya existe`);
        }
        const permiso = new permiso_entity_1.Permiso();
        permiso.rutaPermiso = dto.rutaPermiso.trim();
        return await this.genericRepository.guardarCambios(permiso_entity_1.Permiso, permiso);
    }
    async actualizar(id, dto) {
        const encontrados = await this.genericRepository.buscar(permiso_entity_1.Permiso, 'permiso', [{ atributo: 'id', operacion: '=', valor: id }]);
        if (!encontrados.length || encontrados[0].fechaHoraBaja) {
            throw new common_1.NotFoundException(`Permiso con ID ${id} no encontrado`);
        }
        const permiso = encontrados[0];
        if (dto.rutaPermiso && dto.rutaPermiso.trim().toLowerCase() !== permiso.rutaPermiso.trim().toLowerCase()) {
            const duplicados = await this.genericRepository.buscar(permiso_entity_1.Permiso, 'permiso', [{ atributo: 'rutaPermiso', operacion: '=', valor: dto.rutaPermiso }]);
            if (duplicados.some(p => p.id !== permiso.id &&
                p.rutaPermiso.trim().toLowerCase() === dto.rutaPermiso.trim().toLowerCase())) {
                throw new common_1.BadRequestException(`El permiso con ruta "${dto.rutaPermiso}" ya existe`);
            }
            permiso.rutaPermiso = dto.rutaPermiso.trim();
        }
        return await this.genericRepository.guardarCambios(permiso_entity_1.Permiso, permiso);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(permiso_entity_1.Permiso, id);
    }
};
exports.AbmPermisoUseCase = AbmPermisoUseCase;
exports.AbmPermisoUseCase = AbmPermisoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmPermisoUseCase);
//# sourceMappingURL=abm-permiso.use-case.js.map