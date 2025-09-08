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
exports.AbmTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const turno_entity_1 = require("../../../../domain/entities/turno.entity");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
let AbmTurnoUseCase = class AbmTurnoUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const turno = new turno_entity_1.Turno();
        turno.fecha = dto.fechaTurno;
        turno.hora = dto.horaTurno;
        turno.estadoTurno = dto.estadoTurno;
        turno.especialidad = dto.especialidad;
        turno.hospital = dto.hospital;
        turno.medico = dto.medico;
        turno.observaciones = '';
        turno.presentismo = false;
        return await this.genericRepository.guardarCambios(turno_entity_1.Turno, turno);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(turno_entity_1.Turno, id);
    }
};
exports.AbmTurnoUseCase = AbmTurnoUseCase;
exports.AbmTurnoUseCase = AbmTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmTurnoUseCase);
//# sourceMappingURL=abm-turno.use-case.js.map