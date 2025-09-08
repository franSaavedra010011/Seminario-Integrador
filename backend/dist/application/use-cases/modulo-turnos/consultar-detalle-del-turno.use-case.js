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
exports.ConsultarDetalleDelTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
let ConsultarDetalleDelTurnoUseCase = class ConsultarDetalleDelTurnoUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async consultarDetalleTurno(idTurnoSeleccionado) {
        const turnosSeleccionados = await this.genericRepository.buscar(turno_entity_1.Turno, 'turno', [
            {
                atributo: 'id',
                operacion: '=',
                valor: idTurnoSeleccionado,
            },
            {
                atributo: 'fechaHoraBaja',
                operacion: 'isNull',
                valor: '',
            },
        ]);
        if (!turnosSeleccionados.length) {
            throw new common_1.BadRequestException(`El turno con id: "${idTurnoSeleccionado}" No existe o ya ha sido dado de baja`);
        }
        const turnoSeleccionado = turnosSeleccionados[0];
        const dto = {
            descripcion: turnoSeleccionado.observaciones,
            fecha: turnoSeleccionado.fecha,
            hora: turnoSeleccionado.hora,
        };
        return dto;
    }
};
exports.ConsultarDetalleDelTurnoUseCase = ConsultarDetalleDelTurnoUseCase;
exports.ConsultarDetalleDelTurnoUseCase = ConsultarDetalleDelTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], ConsultarDetalleDelTurnoUseCase);
//# sourceMappingURL=consultar-detalle-del-turno.use-case.js.map