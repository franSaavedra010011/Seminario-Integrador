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
exports.PacienteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const paciente_entity_1 = require("./entities/paciente.entity");
const auth_service_1 = require("../auth/auth.service");
const rol_enum_1 = require("../common/enums/rol.enum");
let PacienteService = class PacienteService {
    pacienteRepository;
    authService;
    constructor(pacienteRepository, authService) {
        this.pacienteRepository = pacienteRepository;
        this.authService = authService;
    }
    async create(pacienteDto, usuarioDto) {
        usuarioDto.rol = rol_enum_1.Role.PACIENTE;
        const usuario = await this.authService.register(usuarioDto);
        const paciente = this.pacienteRepository.create(pacienteDto);
        usuario.setPacientes(paciente);
        return this.pacienteRepository.save(paciente);
    }
    createAdmin(pacienteDto) {
        return;
    }
    async update(id, updatePacienteDto) {
        const paciente = await this.pacienteRepository.findOneBy({ id });
        if (!paciente) {
            throw new common_1.BadRequestException('El paciente que quiere actualizar no se encuentra');
        }
        return this.pacienteRepository.update(id, updatePacienteDto);
    }
    async remove(id) {
        return await this.pacienteRepository.softDelete(id);
    }
};
exports.PacienteService = PacienteService;
exports.PacienteService = PacienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], PacienteService);
//# sourceMappingURL=paciente.service.js.map