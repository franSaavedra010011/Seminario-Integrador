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
exports.NotificarProximidadDeTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const paciente_entity_1 = require("../../../domain/entities/paciente.entity");
const abm_pacienteNotificacion_use_case_1 = require("../abm/pacienteNotificacion/abm-pacienteNotificacion.use-case");
let NotificarProximidadDeTurnoUseCase = class NotificarProximidadDeTurnoUseCase {
    genericRepository;
    turnoRepository;
    pacienteRepository;
    abmPacienteNotificacionUseCase;
    constructor(genericRepository, turnoRepository, pacienteRepository, abmPacienteNotificacionUseCase) {
        this.genericRepository = genericRepository;
        this.turnoRepository = turnoRepository;
        this.pacienteRepository = pacienteRepository;
        this.abmPacienteNotificacionUseCase = abmPacienteNotificacionUseCase;
    }
    async notificarProximidadDeTurno() {
        const fechaProximaAviso = new Date();
        fechaProximaAviso.setDate(fechaProximaAviso.getDate() + 1);
        const turnos = await this.turnoRepository
            .createQueryBuilder('turno')
            .where('turno.fechaHoraBaja IS NULL')
            .getMany();
        for (const turno of turnos) {
            console.log(fechaProximaAviso.getDate());
            console.log(turno.fecha.getDate());
            console.log(turno.fecha.getDate() === fechaProximaAviso.getDate());
            if (turno.fecha.getDate() === fechaProximaAviso.getDate()) {
                const pacientes = await this.pacienteRepository
                    .createQueryBuilder('paciente')
                    .leftJoinAndSelect('paciente.turnos', 'turno')
                    .leftJoinAndSelect('paciente.pacienteNotificaciones', 'notificacion')
                    .where('paciente.fechaHoraBaja IS NULL')
                    .getMany();
                for (const paciente of pacientes) {
                    const turnosDePaciente = paciente.turnos;
                    for (const turnoDePaciente of turnosDePaciente) {
                        if (turnoDePaciente.id === turno.id) {
                            const dtoCrearNotificacion = {
                                observaciones: `Recuerde que su turno es mañana.`,
                                paciente: paciente,
                                turno: turno,
                            };
                            this.abmPacienteNotificacionUseCase.crear(dtoCrearNotificacion);
                        }
                    }
                }
            }
            else {
                throw new common_1.BadRequestException(`No hay ningun turno proximo`);
            }
        }
    }
};
exports.NotificarProximidadDeTurnoUseCase = NotificarProximidadDeTurnoUseCase;
exports.NotificarProximidadDeTurnoUseCase = NotificarProximidadDeTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __param(2, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        abm_pacienteNotificacion_use_case_1.AbmPacienteNotificacionUseCase])
], NotificarProximidadDeTurnoUseCase);
//# sourceMappingURL=notificar-proximidad-de-turno.use-case.js.map