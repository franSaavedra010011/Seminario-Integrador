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
exports.CancelarTurnoUseCase = void 0;
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const turno_agenda_dia_entity_1 = require("../../../domain/entities/turno-agenda-dia.entity");
const abm_turno_use_case_1 = require("../abm/turno/abm-turno.use-case");
const estado_turno_entity_1 = require("../../../domain/entities/estado-turno.entity");
const estado_turno_enum_1 = require("../../../domain/enums/estado-turno.enum");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CancelarTurnoUseCase = class CancelarTurnoUseCase {
    genericRepository;
    bajaLogica;
    turnoRepository;
    turnoAgendaDiaRepository;
    constructor(genericRepository, bajaLogica, turnoRepository, turnoAgendaDiaRepository) {
        this.genericRepository = genericRepository;
        this.bajaLogica = bajaLogica;
        this.turnoRepository = turnoRepository;
        this.turnoAgendaDiaRepository = turnoAgendaDiaRepository;
    }
    async bajaTurno(idTurnoSeleccionado) {
        const estadoBajas = await this.genericRepository.buscar(estado_turno_entity_1.EstadoTurno, 'estadoTurno', [
            {
                atributo: 'nombre',
                operacion: '=',
                valor: estado_turno_enum_1.EstadoTurnoEnum.CANCELADO,
            },
        ]);
        const turnoSeleccionado = await this.turnoRepository
            .createQueryBuilder('turno')
            .leftJoinAndSelect('turno.hospital', 'hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
            .leftJoinAndSelect('hem.agendaSemanales', 'agenda')
            .leftJoinAndSelect('agenda.agendasDia', 'agendasDia')
            .leftJoinAndSelect('agendasDia.turnosAgendaDia', 'turnosAgendaDia')
            .leftJoinAndSelect('turnosAgendaDia.turno', 'turnoDia')
            .leftJoinAndSelect('turno.estadoTurno', 'estadoTurno')
            .where('turno.id = :id AND turno.fechaHoraBaja IS NULL', {
            id: idTurnoSeleccionado,
        })
            .getOne();
        if (!turnoSeleccionado) {
            throw new common_1.BadRequestException(`El turno con id: "${idTurnoSeleccionado}" No existe o ya ha sido dado de baja`);
        }
        const hospitalRelacionado = turnoSeleccionado.hospital;
        const hospitalEspecialidadRelacionados = hospitalRelacionado.hospitalEspecialidades;
        const nroSemanaCalculo = this.getWeekNumber(turnoSeleccionado.fecha);
        const dias = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
        ];
        const diaTurno = dias[turnoSeleccionado.fecha.getDay()];
        for (const hospitalEspecialidadRelacionado of hospitalEspecialidadRelacionados) {
            const fechaHoraBajaHospitalEspecialidadRelacionado = hospitalEspecialidadRelacionado.fechaHoraBaja;
            const fechaHoraHastaHospitalEspecialidadRelacionado = hospitalEspecialidadRelacionado.fechaHasta;
            if (fechaHoraBajaHospitalEspecialidadRelacionado === null &&
                fechaHoraHastaHospitalEspecialidadRelacionado === null) {
                const hospitalEspecialidadMedicoRelacionados = hospitalEspecialidadRelacionado.hospitalEspecialidadMedico;
                for (const hospitalEspecialidadMedicoRelacionado of hospitalEspecialidadMedicoRelacionados) {
                    const fechaHoraHastaHospitalEspecialidadMedicoRelacionado = hospitalEspecialidadMedicoRelacionado.fechaHasta;
                    const fechaHoraBajaHospitalEspecialidadMedicoRelacionado = hospitalEspecialidadMedicoRelacionado.fechaHoraBaja;
                    if (fechaHoraBajaHospitalEspecialidadMedicoRelacionado === null &&
                        fechaHoraHastaHospitalEspecialidadMedicoRelacionado === null) {
                        const agendasSemanalesRelacionadas = hospitalEspecialidadMedicoRelacionado.agendaSemanales;
                        for (const agendaSemanalRelacionada of agendasSemanalesRelacionadas) {
                            const nroSemana = agendaSemanalRelacionada.nroSemana;
                            const fechaBajaAgendaSemanal = agendaSemanalRelacionada.fechaHoraBaja;
                            if (nroSemana == nroSemanaCalculo &&
                                fechaBajaAgendaSemanal === null) {
                                const agendaDias = agendaSemanalRelacionada.agendasDia;
                                for (const agendaDia of agendaDias) {
                                    const diaComparar = agendaDia.nombreAgendaDia.toLocaleLowerCase();
                                    if (diaComparar === diaTurno) {
                                        const turnosAgendaDia = agendaDia.turnosAgendaDia;
                                        for (const turnoAgendaDia of turnosAgendaDia) {
                                            if (turnoAgendaDia.turno !== null) {
                                                const idTurnoComparar = turnoAgendaDia.turno.id;
                                                if (idTurnoSeleccionado === idTurnoComparar) {
                                                    turnoAgendaDia.disponible = false;
                                                    turnoAgendaDia.turno = null;
                                                    turnoSeleccionado.estadoTurno = estadoBajas[0];
                                                    await this.turnoAgendaDiaRepository.save(turnoAgendaDia);
                                                    await this.turnoRepository.save(turnoSeleccionado);
                                                    this.bajaLogica.eliminar(idTurnoSeleccionado);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
        return weekNo;
    }
};
exports.CancelarTurnoUseCase = CancelarTurnoUseCase;
exports.CancelarTurnoUseCase = CancelarTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(turno_entity_1.Turno)),
    __param(3, (0, typeorm_2.InjectRepository)(turno_agenda_dia_entity_1.TurnoAgendaDia)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        abm_turno_use_case_1.AbmTurnoUseCase,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CancelarTurnoUseCase);
//# sourceMappingURL=cancelar-turno.use-case.js.map