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
exports.SolicitarTurnoUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const abm_turno_estado_use_case_1 = require("../abm/turnoEstado/abm-turno-estado.use-case");
const especialidad_entity_1 = require("../../../domain/entities/especialidad.entity");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const turno_agenda_dia_entity_1 = require("../../../domain/entities/turno-agenda-dia.entity");
const medico_entity_1 = require("../../../domain/entities/medico.entity");
const paciente_entity_1 = require("../../../domain/entities/paciente.entity");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
const estado_turno_entity_1 = require("../../../domain/entities/estado-turno.entity");
const estado_turno_enum_1 = require("../../../domain/enums/estado-turno.enum");
const abm_turno_use_case_1 = require("../abm/turno/abm-turno.use-case");
const agenda_semanal_entity_1 = require("../../../domain/entities/agenda-semanal.entity");
let SolicitarTurnoUseCase = class SolicitarTurnoUseCase {
    genericRepository;
    especialidadRepository;
    hospitalRepository;
    turnoAgendaDiaRepository;
    medicoDiaRepository;
    usuarioRepository;
    estadoTurnoRepository;
    pacienteRepository;
    agendaSemanalRepository;
    abmTurnoEstadoUseCase;
    abmTurnoUseCase;
    constructor(genericRepository, especialidadRepository, hospitalRepository, turnoAgendaDiaRepository, medicoDiaRepository, usuarioRepository, estadoTurnoRepository, pacienteRepository, agendaSemanalRepository, abmTurnoEstadoUseCase, abmTurnoUseCase) {
        this.genericRepository = genericRepository;
        this.especialidadRepository = especialidadRepository;
        this.hospitalRepository = hospitalRepository;
        this.turnoAgendaDiaRepository = turnoAgendaDiaRepository;
        this.medicoDiaRepository = medicoDiaRepository;
        this.usuarioRepository = usuarioRepository;
        this.estadoTurnoRepository = estadoTurnoRepository;
        this.pacienteRepository = pacienteRepository;
        this.agendaSemanalRepository = agendaSemanalRepository;
        this.abmTurnoEstadoUseCase = abmTurnoEstadoUseCase;
        this.abmTurnoUseCase = abmTurnoUseCase;
    }
    async solicitarTurnoEspecialidades() {
        const especialidades = await this.especialidadRepository
            .createQueryBuilder('especialidad')
            .where('especialidad.fechaHoraBaja IS NULL')
            .getMany();
        if (!especialidades) {
            throw new common_1.BadRequestException(`No hay especialidades disponibles`);
        }
        const listaEspecialidadesDTO = [];
        for (const especialidad of especialidades) {
            const especialidadDTO = {
                idEspecialidad: especialidad.id,
                nombreEspecialidad: especialidad.nombre,
            };
            listaEspecialidadesDTO.push(especialidadDTO);
        }
        return listaEspecialidadesDTO;
    }
    async solicitarTurnoLocalidades(idEspecialidad) {
        const hospitales = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.especialidad', 'esp')
            .leftJoinAndSelect('hospital.localidad', 'loc')
            .where('hospital.fechaHoraBaja IS NULL')
            .getMany();
        if (!hospitales) {
            throw new common_1.BadRequestException(`No hay hospitales disponibles`);
        }
        const listaLocalidadesDTO = [];
        for (const hospital of hospitales) {
            const hospitalEspecialidades = hospital.hospitalEspecialidades;
            for (const hospitalEspecialidad of hospitalEspecialidades) {
                const especialdiad = hospitalEspecialidad.especialidad;
                if (especialdiad.id === idEspecialidad &&
                    hospitalEspecialidad.fechaHoraBaja === null) {
                    const localidad = hospital.localidad;
                    const localidadDTO = {
                        idLocalidad: localidad.id,
                        nombreLocalidad: localidad.nombre,
                    };
                    listaLocalidadesDTO.push(localidadDTO);
                }
            }
        }
        return listaLocalidadesDTO;
    }
    async solicitarTurnoHospitales(idEspecialidad, idLocalidad) {
        const hospitales = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.especialidad', 'esp')
            .leftJoinAndSelect('hospital.localidad', 'loc')
            .leftJoinAndSelect('hospital.congestionesActual', 'con')
            .where('hospital.fechaHoraBaja IS NULL')
            .getMany();
        if (!hospitales) {
            throw new common_1.BadRequestException(`No hay hospitales disponibles`);
        }
        const listaHospitalesDTO = [];
        for (const hospital of hospitales) {
            const localidad = hospital.localidad;
            if (localidad.id === idLocalidad) {
                const hospitalEspecialidades = hospital.hospitalEspecialidades;
                for (const hospitalEspecialidad of hospitalEspecialidades) {
                    const especialdiad = hospitalEspecialidad.especialidad;
                    if (especialdiad.id === idEspecialidad &&
                        hospitalEspecialidad.fechaHoraBaja === null &&
                        hospitalEspecialidad.fechaHasta === null) {
                        const congestionesActuales = hospital.congestionesActual;
                        let congestionActualGuardar;
                        if (congestionesActuales) {
                            for (const congestionActual of congestionesActuales) {
                                if (congestionActual.fechaHoraBaja === null) {
                                    congestionActualGuardar = congestionActual.nivelCongestion;
                                }
                            }
                            const hospitalDTO = {
                                idHospital: hospital.id,
                                nombreHospital: hospital.nombre,
                                direccionHospital: hospital.direccion,
                                nivelCongestion: congestionActualGuardar,
                            };
                            listaHospitalesDTO.push(hospitalDTO);
                        }
                    }
                }
            }
        }
        return listaHospitalesDTO;
    }
    async solicitarTurnoMedicos(idEspecialidad, idHospital) {
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
            throw new common_1.BadRequestException(`No hay hospital disponible`);
        }
        const listaMedicosDTO = [];
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        for (const hospitalEspecialidad of hospitalEspecialidades) {
            const especialdiad = hospitalEspecialidad.especialidad;
            if (especialdiad.id === idEspecialidad &&
                hospitalEspecialidad.fechaHoraBaja === null &&
                hospitalEspecialidad.fechaHasta === null) {
                const hospitalEspecialidadMedicos = hospitalEspecialidad.hospitalEspecialidadMedico;
                for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
                    if (hospitalEspecialidadMedico.fechaHoraBaja === null &&
                        hospitalEspecialidadMedico.fechaHasta === null) {
                        const medicoEncontrado = hospitalEspecialidadMedico.medico;
                        const medicoDTO = {
                            idMedico: medicoEncontrado.id,
                            nombreMedico: medicoEncontrado.nombreMedico,
                            apellidoMedico: medicoEncontrado.apellidoMedico,
                        };
                        listaMedicosDTO.push(medicoDTO);
                    }
                }
            }
        }
        return listaMedicosDTO;
    }
    async solicitarTurnoAgendas(idMedico, idHospital) {
        const fechaActual = new Date();
        const nroSemanaActual = this.getWeekNumber(fechaActual);
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .leftJoinAndSelect('hospital.hospitalEspecialidades', 'he')
            .leftJoinAndSelect('he.hospitalEspecialidadMedico', 'hem')
            .leftJoinAndSelect('hem.medico', 'med')
            .leftJoinAndSelect('hem.agendaSemanales', 'as')
            .leftJoinAndSelect('as.agendasDia', 'ad')
            .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`No hay hospital disponible`);
        }
        const hospitalEspecialidades = hospital.hospitalEspecialidades;
        const ListaDeAgendasDTO = [];
        for (const hospitalEspecialidad of hospitalEspecialidades) {
            if (hospitalEspecialidad.fechaHoraBaja === null &&
                hospitalEspecialidad.fechaHasta === null) {
                const hospitalEspecialidadMedicos = hospitalEspecialidad.hospitalEspecialidadMedico;
                console.log(hospitalEspecialidadMedicos);
                for (const hospitalEspecialidadMedico of hospitalEspecialidadMedicos) {
                    if (hospitalEspecialidadMedico.fechaHoraBaja === null &&
                        hospitalEspecialidadMedico.fechaHasta === null) {
                        const medicoEncontrado = hospitalEspecialidadMedico.medico;
                        if (medicoEncontrado.id === idMedico) {
                            const agendasSemanales = hospitalEspecialidadMedico.agendaSemanales;
                            for (const agendaSemanal of agendasSemanales) {
                                if ((agendaSemanal.nroSemana === nroSemanaActual ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 1 ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 2 ||
                                    agendaSemanal.nroSemana === nroSemanaActual + 3) &&
                                    agendaSemanal.fechaHoraBaja === null) {
                                    const agendaDias = agendaSemanal.agendasDia;
                                    const ListaAgendaDia = [];
                                    for (const agendaDia of agendaDias) {
                                        let fechaBajaAgendaDiaDTO;
                                        if (agendaDia.fechaHoraBaja !== null) {
                                            fechaBajaAgendaDiaDTO = agendaDia.fechaHoraBaja;
                                        }
                                        else {
                                            fechaBajaAgendaDiaDTO = null;
                                        }
                                        const turnosAgendaDia = agendaDia.turnosAgendaDia;
                                        const ListaTurnosDTO = [];
                                        for (const turnoAgendaDia of turnosAgendaDia) {
                                            const turnoDTO = {
                                                disponible: turnoAgendaDia.disponible,
                                                horaDesde: turnoAgendaDia.horaDesde,
                                                horaHasta: turnoAgendaDia.horaHasta,
                                                fechaBaja: turnoAgendaDia.fechaHoraBaja,
                                                idTurno: turnoAgendaDia.id,
                                            };
                                            ListaTurnosDTO.push(turnoDTO);
                                        }
                                        const agendaDiaDTO = {
                                            idDia: agendaDia.id,
                                            nombreDia: agendaDia.nombreAgendaDia,
                                            fechaHoraBajaAgendaDia: fechaBajaAgendaDiaDTO,
                                            turnos: ListaTurnosDTO,
                                        };
                                        ListaAgendaDia.push(agendaDiaDTO);
                                    }
                                    const agendaSemanalDTO = {
                                        idSemana: agendaSemanal.id,
                                        nroSemana: agendaSemanal.nroSemana,
                                        fechaDesde: agendaSemanal.fechaDesdeAgendaSemanal,
                                        fechaHasta: agendaSemanal.fechaHastaAgendaSemanal,
                                        dias: ListaAgendaDia,
                                    };
                                    ListaDeAgendasDTO.push(agendaSemanalDTO);
                                }
                            }
                        }
                    }
                }
            }
        }
        return ListaDeAgendasDTO;
    }
    async solicitarTurnoResumen(idMedico, idHospital, idAgendaSemanal, idAgendaDia, idTurnoAgendaDia, idEspecialidad, emailUsuario) {
        const agendaSemanal = await this.agendaSemanalRepository
            .createQueryBuilder('agendaSemanal')
            .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
            .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
            .where('agendaSemanal.id = :id AND agendaSemanal.fechaHoraBaja IS NULL', {
            id: idAgendaSemanal,
        })
            .getOne();
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        const especialidad = await this.especialidadRepository
            .createQueryBuilder('especialidad')
            .where('especialidad.id = :id AND especialidad.fechaHoraBaja IS NULL', {
            id: idEspecialidad,
        })
            .getOne();
        const medico = await this.medicoDiaRepository
            .createQueryBuilder('medico')
            .where('medico.id = :id AND medico.fechaHoraBaja IS NULL', {
            id: idMedico,
        })
            .getOne();
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.paciente', 'pac')
            .where('usuario.emailUsuario = :email AND usuario.fechaHoraBaja IS NULL', {
            email: emailUsuario,
        })
            .getOne();
        if (!agendaSemanal || !hospital || !especialidad || !medico || !usuario) {
            throw new common_1.BadRequestException(`La seleccion ha fallado, vuelva a intentarlo`);
        }
        let resumenDTO;
        const agendasDias = agendaSemanal.agendasDia;
        for (const agendaDia of agendasDias) {
            if (agendaDia.id === idAgendaDia) {
                const turnos = agendaDia.turnosAgendaDia;
                for (const turnoAgendaSeleccionado of turnos) {
                    if (turnoAgendaSeleccionado.disponible === true &&
                        turnoAgendaSeleccionado.id === idTurnoAgendaDia) {
                        turnoAgendaSeleccionado.disponible = false;
                        this.turnoAgendaDiaRepository.save(turnoAgendaSeleccionado);
                        resumenDTO = {
                            nombreEspecialidad: especialidad.nombre,
                            nombreHospital: hospital.nombre,
                            nombreMedico: medico.nombreMedico,
                            apellidoMedico: medico.apellidoMedico,
                            fechaTurno: this.obtenerFechaDesdeDia(agendaSemanal.fechaDesdeAgendaSemanal, agendaDia.nombreAgendaDia),
                            fechaHoraActual: new Date(),
                            nombrePaciente: usuario.paciente.nombrePaciente,
                            apellidoPaciente: usuario.paciente.apellidoPaciente,
                        };
                    }
                    else {
                        throw new common_1.BadRequestException(`El turno seleccionado no esta disponible`);
                    }
                }
            }
        }
        console.log(resumenDTO);
        return resumenDTO;
    }
    async solicitarTurnoFinalizar(idMedico, idHospital, idAgendaSemanal, idAgendaDia, idTurnoAgendaDia, idEspecialidad, emailUsuario) {
        const agendaSemanal = await this.agendaSemanalRepository
            .createQueryBuilder('agendaSemanal')
            .leftJoinAndSelect('agendaSemanal.agendasDia', 'ad')
            .leftJoinAndSelect('ad.turnosAgendaDia', 'tad')
            .where('agendaSemanal.id = :id AND agendaSemanal.fechaHoraBaja IS NULL', {
            id: idAgendaSemanal,
        })
            .getOne();
        const hospitalAsignar = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        const especialidadAsignar = await this.especialidadRepository
            .createQueryBuilder('especialidad')
            .where('especialidad.id = :id AND especialidad.fechaHoraBaja IS NULL', {
            id: idEspecialidad,
        })
            .getOne();
        const medicoAsignar = await this.medicoDiaRepository
            .createQueryBuilder('medico')
            .where('medico.id = :id AND medico.fechaHoraBaja IS NULL', {
            id: idMedico,
        })
            .getOne();
        const estadoAsignar = await this.estadoTurnoRepository
            .createQueryBuilder('estadoTurno')
            .where('estadoTurno.nombre = :nombre AND estadoTurno.fechaHoraBaja IS NULL', {
            nombre: estado_turno_enum_1.EstadoTurnoEnum.RESERVADO,
        })
            .getOne();
        const usuarioAsignar = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.paciente', 'pac')
            .leftJoinAndSelect('pac.turnos', 'tur')
            .where('usuario.emailUsuario = :email AND usuario.fechaHoraBaja IS NULL', {
            email: emailUsuario,
        })
            .getOne();
        if (!agendaSemanal ||
            !hospitalAsignar ||
            !especialidadAsignar ||
            !medicoAsignar ||
            !usuarioAsignar) {
            throw new common_1.BadRequestException(`La seleccion ha fallado, vuelva a intentarlo`);
        }
        const agendasDias = agendaSemanal.agendasDia;
        for (const agendaDia of agendasDias) {
            if (agendaDia.id === idAgendaDia) {
                const turnos = agendaDia.turnosAgendaDia;
                for (const turnoAgendaSeleccionado of turnos) {
                    if (turnoAgendaSeleccionado.disponible === false &&
                        turnoAgendaSeleccionado.id === idTurnoAgendaDia) {
                        console.log('entre');
                        const dtoTurno = {
                            fechaTurno: this.obtenerFechaDesdeDia(agendaSemanal.fechaDesdeAgendaSemanal, agendaDia.nombreAgendaDia),
                            horaTurno: turnoAgendaSeleccionado.horaDesde,
                            estadoTurno: estadoAsignar,
                            especialidad: especialidadAsignar,
                            hospital: hospitalAsignar,
                            medico: medicoAsignar,
                            descripcion: '',
                        };
                        const turnoCreado = await this.abmTurnoUseCase.crear(dtoTurno);
                        const turnoEstadoDTO = {
                            estadoTurno: estadoAsignar,
                            turno: turnoCreado,
                        };
                        this.abmTurnoEstadoUseCase.crear(turnoEstadoDTO);
                        const paciente = usuarioAsignar.paciente;
                        console.log(paciente.turnos);
                        paciente.turnos.push(turnoCreado);
                        this.pacienteRepository.save(paciente);
                    }
                    else {
                        throw new common_1.BadRequestException(`Hubo un problema`);
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
    obtenerFechaDesdeDia(fechaDesde, nombreDia) {
        const dias = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
        ];
        const diaDeseado = dias.indexOf(nombreDia.toLowerCase());
        if (diaDeseado === -1)
            throw new Error('Día inválido');
        const fecha = new Date(fechaDesde);
        const diaSemana = fecha.getDay();
        const diff = diaSemana === 0 ? -6 : 1 - diaSemana;
        fecha.setDate(fecha.getDate() + diff);
        const resultado = new Date(fecha);
        const desplazamiento = diaDeseado === 0 ? 6 : diaDeseado - 1;
        resultado.setDate(fecha.getDate() + desplazamiento);
        return resultado;
    }
};
exports.SolicitarTurnoUseCase = SolicitarTurnoUseCase;
exports.SolicitarTurnoUseCase = SolicitarTurnoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(2, (0, typeorm_1.InjectRepository)(hospital_entity_1.Hospital)),
    __param(3, (0, typeorm_1.InjectRepository)(turno_agenda_dia_entity_1.TurnoAgendaDia)),
    __param(4, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __param(5, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(6, (0, typeorm_1.InjectRepository)(estado_turno_entity_1.EstadoTurno)),
    __param(7, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __param(8, (0, typeorm_1.InjectRepository)(agenda_semanal_entity_1.AgendaSemanal)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        abm_turno_estado_use_case_1.AbmTurnoEstadoUseCase,
        abm_turno_use_case_1.AbmTurnoUseCase])
], SolicitarTurnoUseCase);
//# sourceMappingURL=solicitar-turno.use-case.js.map