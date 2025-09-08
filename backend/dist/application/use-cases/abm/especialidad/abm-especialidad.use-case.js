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
exports.AbmEspecialidadUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const especialidad_entity_1 = require("../../../../domain/entities/especialidad.entity");
let AbmEspecialidadUseCase = class AbmEspecialidadUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const duplicados = await this.genericRepository.buscar(especialidad_entity_1.Especialidad, 'esp', [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }]);
        if (duplicados.some(e => e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
            throw new common_1.BadRequestException(`La especialidad "${dto.nombre}" ya existe`);
        }
        const especialidad = new especialidad_entity_1.Especialidad();
        especialidad.nombre = dto.nombre.trim();
        especialidad.descripcion = dto.descripcion?.trim() ?? null;
        return await this.genericRepository.guardarCambios(especialidad_entity_1.Especialidad, especialidad);
    }
    async actualizar(id, dto) {
        const encontrados = await this.genericRepository.buscar(especialidad_entity_1.Especialidad, 'esp', [{ atributo: 'id', operacion: '=', valor: id }]);
        if (!encontrados.length || encontrados[0].fechaHoraBaja) {
            throw new common_1.NotFoundException(`Especialidad con ID ${id} no encontrada`);
        }
        const especialidad = encontrados[0];
        if (dto.nombre && dto.nombre.trim().toLowerCase() !== especialidad.nombre.trim().toLowerCase()) {
            const duplicados = await this.genericRepository.buscar(especialidad_entity_1.Especialidad, 'esp', [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }]);
            if (duplicados.some(e => e.id !== especialidad.id &&
                e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
                throw new common_1.BadRequestException(`La especialidad "${dto.nombre}" ya existe`);
            }
            especialidad.nombre = dto.nombre.trim();
        }
        if (dto.descripcion !== undefined) {
            especialidad.descripcion = dto.descripcion?.trim() ?? null;
        }
        return await this.genericRepository.guardarCambios(especialidad_entity_1.Especialidad, especialidad);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(especialidad_entity_1.Especialidad, id);
    }
};
exports.AbmEspecialidadUseCase = AbmEspecialidadUseCase;
exports.AbmEspecialidadUseCase = AbmEspecialidadUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmEspecialidadUseCase);
//# sourceMappingURL=abm-especialidad.use-case.js.map