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
exports.ConsultarHistorialDeTurnosUseCase = void 0;
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
let ConsultarHistorialDeTurnosUseCase = class ConsultarHistorialDeTurnosUseCase {
    genericRepository;
    usuarioRepository;
    constructor(genericRepository, usuarioRepository) {
        this.genericRepository = genericRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async consultarHistorialTurnos(mailUsuario) {
        const usuario = await this.usuarioRepository
            .createQueryBuilder('usuario')
            .leftJoinAndSelect('usuario.paciente', 'pac')
            .leftJoinAndSelect('pac.turnos', 'turn')
            .leftJoinAndSelect('turn.medico', 'med')
            .leftJoinAndSelect('turn.hospital', 'hosp')
            .leftJoinAndSelect('turn.especialidad', 'esp')
            .where('usuario.emailUsuario = :id AND usuario.fechaHoraBaja IS NULL', {
            id: mailUsuario,
        })
            .getOne();
        if (!usuario) {
            throw new common_1.BadRequestException(`El usuario no existe o ya ha sido dado de baja`);
        }
        const listaTurnosDTO = [];
        const paciente = usuario.paciente;
        const turnosPaciente = paciente.turnos;
        for (const turnoPaciente of turnosPaciente) {
            const dtoTurno = {
                fechaTurno: turnoPaciente.fecha,
                fechaBajaTurno: turnoPaciente.fechaHoraBaja,
                presentismo: turnoPaciente.presentismo,
                observaciones: turnoPaciente.observaciones,
                nombreHospital: turnoPaciente.hospital.nombre,
                nombreEspecialidad: turnoPaciente.especialidad.nombre,
                nombreMedico: turnoPaciente.medico.nombreMedico,
                apellidoMedico: turnoPaciente.medico.apellidoMedico,
            };
            listaTurnosDTO.push(dtoTurno);
        }
        if (!listaTurnosDTO || listaTurnosDTO.length === 0) {
            throw new common_1.BadRequestException(`No tiene turnos previos`);
        }
        return listaTurnosDTO;
    }
};
exports.ConsultarHistorialDeTurnosUseCase = ConsultarHistorialDeTurnosUseCase;
exports.ConsultarHistorialDeTurnosUseCase = ConsultarHistorialDeTurnosUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_1.Repository])
], ConsultarHistorialDeTurnosUseCase);
//# sourceMappingURL=consultar-historial-de-turnos.use-case.js.map