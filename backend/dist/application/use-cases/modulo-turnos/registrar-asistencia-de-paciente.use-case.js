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
exports.RegistrarAsistenciaDePacienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const estado_turno_entity_1 = require("../../../domain/entities/estado-turno.entity");
const estado_turno_enum_1 = require("../../../domain/enums/estado-turno.enum");
const abm_turno_estado_use_case_1 = require("../abm/turnoEstado/abm-turno-estado.use-case");
let RegistrarAsistenciaDePacienteUseCase = class RegistrarAsistenciaDePacienteUseCase {
    genericRepository;
    turnoRepository;
    estadoTurnoRepository;
    abmTurnoEstadoUseCase;
    constructor(genericRepository, turnoRepository, estadoTurnoRepository, abmTurnoEstadoUseCase) {
        this.genericRepository = genericRepository;
        this.turnoRepository = turnoRepository;
        this.estadoTurnoRepository = estadoTurnoRepository;
        this.abmTurnoEstadoUseCase = abmTurnoEstadoUseCase;
    }
    async registrarAsistenciaDePaciente(idTurno) {
        const turno = await this.turnoRepository
            .createQueryBuilder('turno')
            .leftJoinAndSelect('turno.estadoTurno', 'et')
            .leftJoinAndSelect('turno.turnosEstados', 'te')
            .where('turno.id = :id AND turno.fechaHoraBaja IS NULL', {
            id: idTurno,
        })
            .getOne();
        if (!turno) {
            throw new common_1.BadRequestException(`El turno con id ${idTurno} no existe o ha sido dado de baja`);
        }
        const estadoDelTurno = turno.estadoTurno;
        if (estadoDelTurno.nombre !== estado_turno_enum_1.EstadoTurnoEnum.RESERVADO) {
            throw new common_1.BadRequestException(`El turno con id ${idTurno} se encuentra: ${estadoDelTurno.nombre}`);
        }
        const estadoAsignar = await this.estadoTurnoRepository
            .createQueryBuilder('estadoTurno')
            .where('estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL', {
            nombre: estado_turno_enum_1.EstadoTurnoEnum.ATENDIDO,
        })
            .getOne();
        if (!estadoAsignar) {
            throw new common_1.BadRequestException(`No ha sido posible registrar la asistencia`);
        }
        const dtoCreate = {
            estadoTurno: estadoAsignar,
            turno: turno,
        };
        const turnoEstadoCreado = await this.abmTurnoEstadoUseCase.crear(dtoCreate);
        console.log(turnoEstadoCreado);
        turno.turnosEstados.push(turnoEstadoCreado);
        turno.estadoTurno = estadoAsignar;
        turno.presentismo = true;
        this.turnoRepository.save(turno);
    }
};
exports.RegistrarAsistenciaDePacienteUseCase = RegistrarAsistenciaDePacienteUseCase;
exports.RegistrarAsistenciaDePacienteUseCase = RegistrarAsistenciaDePacienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __param(2, (0, typeorm_1.InjectRepository)(estado_turno_entity_1.EstadoTurno)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        abm_turno_estado_use_case_1.AbmTurnoEstadoUseCase])
], RegistrarAsistenciaDePacienteUseCase);
//# sourceMappingURL=registrar-asistencia-de-paciente.use-case.js.map