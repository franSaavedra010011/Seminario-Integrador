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
exports.ConsultarTurnosActivosUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paciente_entity_1 = require("../../../domain/entities/paciente.entity");
const genericRepository_service_1 = require("../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const estado_turno_enum_1 = require("../../../domain/enums/estado-turno.enum");
let ConsultarTurnosActivosUseCase = class ConsultarTurnosActivosUseCase {
    genericRepository;
    pacienteRepository;
    constructor(genericRepository, pacienteRepository) {
        this.genericRepository = genericRepository;
        this.pacienteRepository = pacienteRepository;
    }
    async consultarTurnosActivos(mailPaciente) {
        const paciente = await this.pacienteRepository
            .createQueryBuilder('paciente')
            .leftJoinAndSelect('paciente.turnos', 'turno')
            .leftJoinAndSelect('turno.estadoTurno', 'estadoTurno')
            .leftJoinAndSelect('turno.hospital', 'hospital')
            .leftJoinAndSelect('turno.medico', 'medico')
            .leftJoinAndSelect('turno.especialidad', 'especialidad')
            .where('paciente.correoPaciente = :mail AND paciente.fechaHoraBaja IS NULL', {
            mail: mailPaciente,
        })
            .getOne();
        console.log(paciente);
        if (!paciente) {
            throw new common_1.BadRequestException(`El paciente con email: "${mailPaciente}" no existe o ya ha sido dado de baja`);
        }
        const turnos = paciente.turnos;
        const dtoLista = [];
        for (const turno of turnos) {
            if (turno.estadoTurno.nombre === estado_turno_enum_1.EstadoTurnoEnum.RESERVADO) {
                const dto = {
                    hora: turno.hora,
                    fecha: turno.fecha,
                    nombreMedico: turno.medico.nombreMedico,
                    apellidoMedico: turno.medico.apellidoMedico,
                    nombreEspecialidad: turno.especialidad.nombre,
                    nombreHospital: turno.hospital.nombre,
                };
                dtoLista.push(dto);
            }
        }
        return dtoLista;
    }
};
exports.ConsultarTurnosActivosUseCase = ConsultarTurnosActivosUseCase;
exports.ConsultarTurnosActivosUseCase = ConsultarTurnosActivosUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService,
        typeorm_2.Repository])
], ConsultarTurnosActivosUseCase);
//# sourceMappingURL=consultar-turnos-activos.use-case.js.map