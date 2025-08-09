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
exports.AbmEstadoTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const estado_turno_entity_1 = require("../../../../domain/entities/estado-turno.entity");
let AbmEstadoTurnoUseCase = class AbmEstadoTurnoUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const duplicados = await this.genericRepository.buscar(estado_turno_entity_1.EstadoTurno, 'estado', [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }]);
        if (duplicados.some(e => e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
            throw new common_1.BadRequestException(`El estado de turno "${dto.nombre}" ya existe`);
        }
        const estado = new estado_turno_entity_1.EstadoTurno();
        estado.nombre = dto.nombre.trim();
        return await this.genericRepository.guardarCambios(estado_turno_entity_1.EstadoTurno, estado);
    }
    async actualizar(id, dto) {
        const encontrados = await this.genericRepository.buscar(estado_turno_entity_1.EstadoTurno, 'estado', [{ atributo: 'id', operacion: '=', valor: id }]);
        if (!encontrados.length || encontrados[0].fechaHoraBaja) {
            throw new common_1.NotFoundException(`EstadoTurno con ID ${id} no encontrado`);
        }
        const estado = encontrados[0];
        if (dto.nombre && dto.nombre.trim().toLowerCase() !== estado.nombre.trim().toLowerCase()) {
            const duplicados = await this.genericRepository.buscar(estado_turno_entity_1.EstadoTurno, 'estado', [{ atributo: 'nombre', operacion: '=', valor: dto.nombre }]);
            if (duplicados.some(e => e.id !== estado.id &&
                e.nombre.trim().toLowerCase() === dto.nombre.trim().toLowerCase())) {
                throw new common_1.BadRequestException(`El estado de turno "${dto.nombre}" ya existe`);
            }
            estado.nombre = dto.nombre.trim();
        }
        return await this.genericRepository.guardarCambios(estado_turno_entity_1.EstadoTurno, estado);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(estado_turno_entity_1.EstadoTurno, id);
    }
};
exports.AbmEstadoTurnoUseCase = AbmEstadoTurnoUseCase;
exports.AbmEstadoTurnoUseCase = AbmEstadoTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmEstadoTurnoUseCase);
//# sourceMappingURL=abm-estado-turno.use-case.js.map