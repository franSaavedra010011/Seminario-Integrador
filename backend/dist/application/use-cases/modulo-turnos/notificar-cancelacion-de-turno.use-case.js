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
exports.NotificarCancelacionDeTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const agenda_dia_entity_1 = require("../../../domain/entities/agenda-dia.entity");
const abm_agendaSemanal_use_case_1 = require("../abm/agendaSemanal/abm-agendaSemanal.use-case");
const agenda_semanal_entity_1 = require("../../../domain/entities/agenda-semanal.entity");
const abm_agendaDia_use_case_1 = require("../abm/agendaDia/abm-agendaDia.use-case");
const abm_turno_use_case_1 = require("../abm/turno/abm-turno.use-case");
const paciente_entity_1 = require("../../../domain/entities/paciente.entity");
const abm_pacienteNotificacion_use_case_1 = require("../abm/pacienteNotificacion/abm-pacienteNotificacion.use-case");
const abm_turno_agenda_dia_use_case_1 = require("../abm/turno-agenda-dia/abm-turno-agenda-dia.use-case");
let NotificarCancelacionDeTurnoUseCase = class NotificarCancelacionDeTurnoUseCase {
    genericRepository;
    usuarioRepository;
    hospitalRepository;
    agendaSemanalRepository;
    pacienteRepository;
    agendaDiaRepository;
    abmAgendaSemanalUseCase;
    abmAgendaDiaUseCase;
    abmTurnoUseCase;
    abmPacienteNotificacionUseCase;
    abmTurnoAgendaDiaUseCase;
    constructor(genericRepository, usuarioRepository, hospitalRepository, agendaSemanalRepository, pacienteRepository, agendaDiaRepository, abmAgendaSemanalUseCase, abmAgendaDiaUseCase, abmTurnoUseCase, abmPacienteNotificacionUseCase, abmTurnoAgendaDiaUseCase) {
        this.genericRepository = genericRepository;
        this.usuarioRepository = usuarioRepository;
        this.hospitalRepository = hospitalRepository;
        this.agendaSemanalRepository = agendaSemanalRepository;
        this.pacienteRepository = pacienteRepository;
        this.agendaDiaRepository = agendaDiaRepository;
        this.abmAgendaSemanalUseCase = abmAgendaSemanalUseCase;
        this.abmAgendaDiaUseCase = abmAgendaDiaUseCase;
        this.abmTurnoUseCase = abmTurnoUseCase;
        this.abmPacienteNotificacionUseCase = abmPacienteNotificacionUseCase;
        this.abmTurnoAgendaDiaUseCase = abmTurnoAgendaDiaUseCase;
    }
    async notificacionMuestraDeHospitales(mailUsuario) {
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.personalHospital', 'personal')
            .leftJoinAndSelect('personal.hospital', 'hospital')
            .where('usuario.emailUsuario = :mail AND usuario.fechaHoraBaja IS NULL', {
            mail: mailUsuario,
        })
            .getOne();
        console.log(usuario);
        if (!usuario) {
            throw new common_1.BadRequestException(`El paciente con email: "${mailUsuario}" no existe o ya ha sido dado de baja`);
        }
        const personal = usuario.personalHospital;
        const ListaHospitales = [];
        for (const persona of personal) {
            if (persona.fechaHoraBaja === null) {
                const dtoHospital = {
                    id: persona.hospital.id,
                    nombreHospital: persona.hospital.nombre,
                };
                ListaHospitales.push(dtoHospital);
            }
        }
        return ListaHospitales;
    }
    async notificacionMuestraDeEspecialidades(idHospital) {
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.especialidad', 'esp')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El hospital con id: "${idHospital}" no existe o ya ha sido dado de baja`);
        }
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        const ListaEspecialidades = [];
        for (const hospitalEspecialidad of hospitalEspecialidades) {
            if (hospitalEspecialidad.fechaHoraBaja === null) {
                const dtoEspecialidad = {
                    id: hospitalEspecialidad.especialidad.id,
                    nombreEspecialidad: hospitalEspecialidad.especialidad.nombre,
                };
                ListaEspecialidades.push(dtoEspecialidad);
            }
        }
        return ListaEspecialidades;
    }
    async notificacionMuestraDeMedicos(idEspecialidad, idHospital) {
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.especialidad', 'esp')
            .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
            .leftJoinAndSelect('hem.medico', 'med')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El especialidad con id: "${idEspecialidad}" no existe o ya ha sido dado de baja`);
        }
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        const ListaMedicos = [];
        for (const hospitalEspecialidad of hospitalEspecialidades) {
            if (hospitalEspecialidad.fechaHoraBaja === null) {
                const especialidadComparar = hospitalEspecialidad.especialidad.id;
                if (especialidadComparar === idEspecialidad) {
                    const hospitalEspecialidadMedicos = hospitalEspecialidad.hospitalEspecialidadMedico;
                    for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
                        const medicoDto = {
                            id: hospitalEspecialidadMedico.medico.id,
                            nombreMedico: hospitalEspecialidadMedico.medico.nombreMedico,
                            apellidoMedico: hospitalEspecialidadMedico.medico.apellidoMedico,
                        };
                        ListaMedicos.push(medicoDto);
                    }
                }
            }
        }
        return ListaMedicos;
    }
    async notificacionMuestraDeAgenda(idMedico, idEspecialidad, idHospital) {
        console.log(`entre: ${idHospital} ${idEspecialidad} ${idMedico}`);
        const fechaActual = new Date();
        const nroSemanaActual = this.getWeekNumber(fechaActual);
        console.log(`entre: ${nroSemanaActual} ${nroSemanaActual + 1} ${nroSemanaActual + 2}`);
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.especialidad', 'esp')
            .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
            .leftJoinAndSelect('hem.medico', 'med')
            .leftJoinAndSelect('hem.agendaSemanales', 'as')
            .leftJoinAndSelect('as.agendasDia', 'ad')
            .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
            .leftJoinAndSelect('tad.turno', 'turno')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El especialidad con id: "${idEspecialidad}" no existe o ya ha sido dado de baja`);
        }
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        const ListaAgendaDTO = [];
        for (const hospitalEspecialidad of hospitalEspecialidades) {
            if (hospitalEspecialidad.fechaHoraBaja === null) {
                const especialidadComparar = hospitalEspecialidad.especialidad.id;
                if (especialidadComparar === idEspecialidad) {
                    const hospitalEspecialidadMedicos = hospitalEspecialidad.hospitalEspecialidadMedico;
                    for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
                        const medico = hospitalEspecialidadMedico.medico;
                        if (medico.id === idMedico) {
                            const agendasSemanales = hospitalEspecialidadMedico.agendaSemanales;
                            for (const agendaSemanal of agendasSemanales) {
                                if ((agendaSemanal.nroSemana === nroSemanaActual ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 1 ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 2 ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 3) &&
                                    agendaSemanal.fechaHoraBaja === null) {
                                    const ListaDiaDTO = [];
                                    const agendaDias = agendaSemanal.agendasDia;
                                    for (const agendaDia of agendaDias) {
                                        const ListaTurnoDTO = [];
                                        const turnosAgendaDia = agendaDia.turnosAgendaDia;
                                        for (const turnoAgendaDia of turnosAgendaDia) {
                                            const turnoDTO = {
                                                idTurno: turnoAgendaDia.id,
                                                disponible: turnoAgendaDia.disponible,
                                                horaDesde: turnoAgendaDia.horaDesde,
                                                horaHasta: turnoAgendaDia.horaHasta,
                                            };
                                            ListaTurnoDTO.push(turnoDTO);
                                        }
                                        const diaDTO = {
                                            nombreDia: agendaDia.nombreAgendaDia,
                                            idAgendaDia: agendaDia.id,
                                            fechaHoraBajaAgendaDia: agendaDia.fechaHoraBaja ?? null,
                                            turnos: ListaTurnoDTO,
                                        };
                                        ListaDiaDTO.push(diaDTO);
                                    }
                                    const agendaDTO = {
                                        nroSemana: agendaSemanal.nroSemana,
                                        dias: ListaDiaDTO,
                                        fechaDesde: agendaSemanal.fechaDesdeAgendaSemanal,
                                        fechaHasta: agendaSemanal.fechaHastaAgendaSemanal,
                                    };
                                    ListaAgendaDTO.push(agendaDTO);
                                }
                            }
                        }
                    }
                }
            }
        }
        return ListaAgendaDTO;
    }
    async notificacionCancelacionDeTurnos(dtoCancelacion) {
        console.log(`entre: ${dtoCancelacion}`);
        if (dtoCancelacion.idAgendaSemana.length > 0 &&
            dtoCancelacion.idAgendaDia.length === 0) {
            for (const idAgenda of dtoCancelacion.idAgendaDia) {
                const agenda = await this.agendaSemanalRepository
                    .createQueryBuilder('agendaSemanal')
                    .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
                    .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
                    .leftJoinAndSelect('tad.turno', 'turno')
                    .where('agenda.id = :id AND agenda.fechaHoraBaja IS NULL', {
                    id: idAgenda,
                })
                    .getOne();
                this.abmAgendaSemanalUseCase.eliminar(agenda.id);
                const agendaDias = agenda.agendasDia;
                for (const agendaDia of agendaDias) {
                    this.abmAgendaDiaUseCase.eliminar(agendaDia.id);
                    const turnosAgendaDia = agendaDia.turnosAgendaDia;
                    for (const turnoAgendaDia of turnosAgendaDia) {
                        this.abmTurnoAgendaDiaUseCase.eliminar(turnoAgendaDia.id);
                        if (turnoAgendaDia.disponible === true) {
                            const turnoRelacionado = turnoAgendaDia.turno;
                            this.abmTurnoUseCase.eliminar(turnoRelacionado.id);
                            const pacientes = await this.pacienteRepository
                                .createQueryBuilder('paciente')
                                .leftJoinAndSelect('paciente.turnos', 't')
                                .leftJoinAndSelect('paciente.pacienteNotificaciones', 'pn')
                                .where('paciente.fechaHoraBaja IS NULL')
                                .getMany();
                            for (const paciente of pacientes) {
                                const turnosDePaciente = paciente.turnos;
                                for (const turnoDePaciente of turnosDePaciente) {
                                    if (turnoDePaciente.id === turnoRelacionado.id) {
                                        const dtoCrearNotificacion = {
                                            observaciones: `Su turno para el dia ${turnoRelacionado.fecha} ha sido cancelado.`,
                                            paciente: paciente,
                                            turno: turnoRelacionado,
                                        };
                                        this.abmPacienteNotificacionUseCase.crear(dtoCrearNotificacion);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            for (const idAgendaDia of dtoCancelacion.idAgendaDia) {
                const agendaDias = await this.agendaDiaRepository
                    .createQueryBuilder('agendaDia')
                    .leftJoinAndSelect('agendaDia.turnosAgendaDia', 'tad')
                    .leftJoinAndSelect('tad.turno', 'turno')
                    .where('agendaDia.id = :id AND agendaDia.fechaHoraBaja IS NULL', {
                    id: idAgendaDia,
                })
                    .getMany();
                for (const agendaDia of agendaDias) {
                    this.abmAgendaDiaUseCase.eliminar(agendaDia.id);
                    const turnosAgendaDia = agendaDia.turnosAgendaDia;
                    for (const turnoAgendaDia of turnosAgendaDia) {
                        this.abmTurnoAgendaDiaUseCase.eliminar(turnoAgendaDia.id);
                        if (turnoAgendaDia.disponible === true) {
                            const turnoRelacionado = turnoAgendaDia.turno;
                            this.abmTurnoUseCase.eliminar(turnoRelacionado.id);
                            const pacientes = await this.pacienteRepository
                                .createQueryBuilder('paciente')
                                .leftJoinAndSelect('paciente.turnos', 't')
                                .leftJoinAndSelect('paciente.pacienteNotificaciones', 'pn')
                                .where('paciente.fechaHoraBaja IS NULL')
                                .getMany();
                            for (const paciente of pacientes) {
                                const turnosDePaciente = paciente.turnos;
                                for (const turnoDePaciente of turnosDePaciente) {
                                    if (turnoDePaciente.id === turnoRelacionado.id) {
                                        const dtoCrearNotificacion = {
                                            observaciones: `Su turno para el dia ${turnoRelacionado.fecha} ha sido cancelado.`,
                                            paciente: paciente,
                                            turno: turnoRelacionado,
                                        };
                                        this.abmPacienteNotificacionUseCase.crear(dtoCrearNotificacion);
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
exports.NotificarCancelacionDeTurnoUseCase = NotificarCancelacionDeTurnoUseCase;
exports.NotificarCancelacionDeTurnoUseCase = NotificarCancelacionDeTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_1.InjectRepository)(hospital_entity_1.Hospital)),
    __param(3, (0, typeorm_1.InjectRepository)(agenda_semanal_entity_1.AgendaSemanal)),
    __param(4, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __param(5, (0, typeorm_1.InjectRepository)(agenda_dia_entity_1.AgendaDia)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        abm_agendaSemanal_use_case_1.AbmAgendaSemanalUseCase,
        abm_agendaDia_use_case_1.AbmAgendaDiaUseCase,
        abm_turno_use_case_1.AbmTurnoUseCase,
        abm_pacienteNotificacion_use_case_1.AbmPacienteNotificacionUseCase,
        abm_turno_agenda_dia_use_case_1.AbmTurnoAgendaDiaUseCase])
], NotificarCancelacionDeTurnoUseCase);
//# sourceMappingURL=notificar-cancelacion-de-turno.use-case.js.map