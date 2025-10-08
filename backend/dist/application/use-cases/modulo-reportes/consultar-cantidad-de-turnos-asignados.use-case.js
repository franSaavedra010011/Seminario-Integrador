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
exports.ConsultarCantidadDeTurnosAsignadosUseCase = void 0;
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const turno_agenda_dia_entity_1 = require("../../../domain/entities/turno-agenda-dia.entity");
const abm_turno_use_case_1 = require("../abm/turno/abm-turno.use-case");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const paciente_entity_1 = require("../../../domain/entities/paciente.entity");
let ConsultarCantidadDeTurnosAsignadosUseCase = class ConsultarCantidadDeTurnosAsignadosUseCase {
    genericRepository;
    bajaLogica;
    usuarioRepository;
    turnoRepository;
    pacienteRepository;
    hospitalRepository;
    turnoAgendaDiaRepository;
    constructor(genericRepository, bajaLogica, usuarioRepository, turnoRepository, pacienteRepository, hospitalRepository, turnoAgendaDiaRepository) {
        this.genericRepository = genericRepository;
        this.bajaLogica = bajaLogica;
        this.usuarioRepository = usuarioRepository;
        this.turnoRepository = turnoRepository;
        this.pacienteRepository = pacienteRepository;
        this.hospitalRepository = hospitalRepository;
        this.turnoAgendaDiaRepository = turnoAgendaDiaRepository;
    }
    async consultarTurnosAsignadosHospitales(mailUsuario) {
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.personalHospital', 'ph')
            .leftJoinAndSelect('ph.hospital', 'h')
            .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
            id: mailUsuario,
        })
            .getOne();
        if (!usuario) {
            throw new common_1.BadRequestException(`El usuario no existe o ya ha sido dado de baja`);
        }
        const listaHospitalDTO = [];
        const personalHospital = usuario.personalHospital;
        for (const persona of personalHospital) {
            if (persona.fechaHoraBaja === null) {
                const hospital = persona.hospital;
                if (hospital.fechaHoraBaja === null) {
                    const dtoHospital = {
                        idHospital: hospital.id,
                        nombreHospital: hospital.nombre,
                    };
                    listaHospitalDTO.push(dtoHospital);
                }
            }
        }
        if (!listaHospitalDTO || listaHospitalDTO.length === 0) {
            throw new common_1.BadRequestException(`No esta asignado en ningun hospital`);
        }
        return listaHospitalDTO;
    }
    async consultarCantidadTurnosAsignados(idHospital, mailUsuario) {
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.personalHospital', 'ph')
            .leftJoinAndSelect('ph.hospital', 'h')
            .leftJoinAndSelect('usuario.medico', 'm')
            .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
            id: mailUsuario,
        })
            .getOne();
        if (!usuario) {
            throw new common_1.BadRequestException(`El usuario no existe o ya ha sido dado de baja`);
        }
        const hospitalSeleccionado = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!usuario) {
            throw new common_1.BadRequestException(`El usuario no existe o ya ha sido dado de baja`);
        }
        const medicoRegistrado = usuario.medico;
        const turnos = await this.turnoRepository
            .createQueryBuilder('turno')
            .leftJoinAndSelect('turno.especialidad', 'e')
            .leftJoinAndSelect('turno.medico', 'm')
            .leftJoinAndSelect('turno.hospital', 'h')
            .where('turno.hospital = :hospital AND turno.medico = :medico AND turno.fechaHoraBaja IS NULL', {
            hospital: hospitalSeleccionado.id,
            medico: medicoRegistrado.id,
        })
            .getMany();
        const listaTurnoDTO = [];
        for (const turno of turnos) {
            const pacientes = await this.pacienteRepository
                .createQueryBuilder('paciente')
                .leftJoinAndSelect('paciente.turnos', 't')
                .where('paciente.fechaHoraBaja IS NULL')
                .getMany();
            for (const paciente of pacientes) {
                const turnosPaciente = paciente.turnos;
                if (turnosPaciente) {
                    for (const turnoPaciente of turnosPaciente) {
                        if (turnoPaciente.id === turno.id) {
                            const turnoDTO = {
                                horaTurno: turno.hora,
                                nombreEspecialidad: turno.especialidad.nombre,
                                nombrePaciente: paciente.nombrePaciente,
                                apellidoPaciente: paciente.apellidoPaciente,
                            };
                            listaTurnoDTO.push(turnoDTO);
                        }
                    }
                }
            }
        }
        if (!listaTurnoDTO || listaTurnoDTO.length === 0) {
            throw new common_1.BadRequestException(`No se encontraron turnos pendientes para hoy`);
        }
        return listaTurnoDTO;
    }
};
exports.ConsultarCantidadDeTurnosAsignadosUseCase = ConsultarCantidadDeTurnosAsignadosUseCase;
exports.ConsultarCantidadDeTurnosAsignadosUseCase = ConsultarCantidadDeTurnosAsignadosUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(3, (0, typeorm_2.InjectRepository)(turno_entity_1.Turno)),
    __param(4, (0, typeorm_2.InjectRepository)(paciente_entity_1.Paciente)),
    __param(5, (0, typeorm_2.InjectRepository)(hospital_entity_1.Hospital)),
    __param(6, (0, typeorm_2.InjectRepository)(turno_agenda_dia_entity_1.TurnoAgendaDia)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        abm_turno_use_case_1.AbmTurnoUseCase,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ConsultarCantidadDeTurnosAsignadosUseCase);
//# sourceMappingURL=consultar-cantidad-de-turnos-asignados.use-case.js.map