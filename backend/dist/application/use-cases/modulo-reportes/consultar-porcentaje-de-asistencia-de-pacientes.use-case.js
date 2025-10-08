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
exports.ConsultarPorcentajeDeAsistenciaDePacientesUseCase = void 0;
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
const hospital_entity_1 = require("../../../domain/entities/hospital.entity");
const turno_entity_1 = require("../../../domain/entities/turno.entity");
let ConsultarPorcentajeDeAsistenciaDePacientesUseCase = class ConsultarPorcentajeDeAsistenciaDePacientesUseCase {
    genericRepository;
    usuarioRepository;
    hospitalRepository;
    turnoRepository;
    constructor(genericRepository, usuarioRepository, hospitalRepository, turnoRepository) {
        this.genericRepository = genericRepository;
        this.usuarioRepository = usuarioRepository;
        this.hospitalRepository = hospitalRepository;
        this.turnoRepository = turnoRepository;
    }
    async consultarPorcentajeAsistenciaPacientesHospitales(mailUsuario) {
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.medico', 'med')
            .leftJoinAndSelect('usuario.personalHospital', 'ph')
            .leftJoinAndSelect('ph.hospital', 'hosp')
            .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
            id: mailUsuario,
        })
            .getOne();
        if (!usuario) {
            throw new common_1.BadRequestException(`El usuario no existe o ya ha sido dado de baja`);
        }
        const medico = usuario.medico;
        if (!medico) {
            throw new common_1.BadRequestException(`El usuario no corresponde a un medico`);
        }
        const personalHospitales = usuario.personalHospital;
        const listaHospitalesDTO = [];
        for (const personal of personalHospitales) {
            const hospital = personal.hospital;
            if (hospital.fechaHoraBaja === null) {
                const dtoHospital = {
                    nombreHospital: hospital.nombre,
                    idHospital: hospital.id,
                };
                listaHospitalesDTO.push(dtoHospital);
            }
        }
        if (!listaHospitalesDTO || listaHospitalesDTO.length === 0) {
            throw new common_1.BadRequestException(`No trabaja en ningun hospital`);
        }
        return listaHospitalesDTO;
    }
    async consultarPorcentajeAsistenciaPacientes(idHospital) {
        const hospital = await this.hospitalRepository
            .createQueryBuilder('hospital')
            .where('hospital.id = :id AND hospital.fechaHoraBaja IS NULL', {
            id: idHospital,
        })
            .getOne();
        if (!hospital) {
            throw new common_1.BadRequestException(`El hospital no existe o ya ha sido dado de baja`);
        }
        const fechaActual = new Date();
        const fechaSolo = fechaActual.toISOString().split('T')[0];
        const hora = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const horaFormateada = `${hora}:${minutos}`;
        const turnos = await this.turnoRepository
            .createQueryBuilder('turno')
            .where('turno.hospital = :hospitalbuscado AND turno.fechaHoraBaja IS NULL AND turno.fecha = :fechaActual AND CAST(turno.hora AS time) <= CAST(:horaActual AS time)', {
            hospitalbuscado: hospital.id,
            fechaActual: fechaSolo,
            horaActual: horaFormateada,
        })
            .getMany();
        if (!turnos) {
            throw new common_1.BadRequestException(`No se encontro el turno`);
        }
        let cantTurno = 0;
        let turnoAsistido = 0;
        for (const turno of turnos) {
            cantTurno = cantTurno + 1;
            if (turno.presentismo === true) {
                turnoAsistido = turnoAsistido + 1;
            }
        }
        const porcentaje = (turnoAsistido * 100) / cantTurno;
        return porcentaje;
    }
};
exports.ConsultarPorcentajeDeAsistenciaDePacientesUseCase = ConsultarPorcentajeDeAsistenciaDePacientesUseCase;
exports.ConsultarPorcentajeDeAsistenciaDePacientesUseCase = ConsultarPorcentajeDeAsistenciaDePacientesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __param(2, (0, typeorm_2.InjectRepository)(hospital_entity_1.Hospital)),
    __param(3, (0, typeorm_2.InjectRepository)(turno_entity_1.Turno)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ConsultarPorcentajeDeAsistenciaDePacientesUseCase);
//# sourceMappingURL=consultar-porcentaje-de-asistencia-de-pacientes.use-case.js.map