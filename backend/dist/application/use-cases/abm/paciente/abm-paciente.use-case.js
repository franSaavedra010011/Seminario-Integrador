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
exports.AbmPacienteUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paciente_entity_1 = require("../../../../domain/entities/paciente.entity");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const localidad_entity_1 = require("../../../../domain/entities/localidad.entity");
let AbmPacienteUseCase = class AbmPacienteUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const localidades = await this.genericRepository.buscar(localidad_entity_1.Localidad, 'localidad', [{ atributo: 'id', operacion: '=', valor: dto.idLocalidad }]);
        if (!localidades.length) {
            throw new common_1.BadRequestException('La localidad proporcionada no existe');
        }
        const paciente = new paciente_entity_1.Paciente();
        Object.assign(paciente, dto);
        paciente.localidad = localidades[0];
        return await this.genericRepository.guardarCambios(paciente_entity_1.Paciente, paciente);
    }
    async actualizar(id, dto) {
        const pacientes = await this.genericRepository.buscar(paciente_entity_1.Paciente, 'paciente', [
            { atributo: 'id', operacion: '=', valor: id },
        ]);
        if (!pacientes.length) {
            throw new common_1.BadRequestException('Paciente no encontrado');
        }
        const paciente = pacientes[0];
        Object.assign(paciente, dto);
        if (dto.idLocalidad) {
            const localidades = await this.genericRepository.buscar(localidad_entity_1.Localidad, 'localidad', [{ atributo: 'id', operacion: '=', valor: dto.idLocalidad }]);
            if (!localidades.length) {
                throw new common_1.BadRequestException('La localidad proporcionada no existe');
            }
            paciente.localidad = localidades[0];
        }
        return await this.genericRepository.guardarCambios(paciente_entity_1.Paciente, paciente);
    }
    async eliminar(id) {
        return this.genericRepository.eliminar(paciente_entity_1.Paciente, id);
    }
};
exports.AbmPacienteUseCase = AbmPacienteUseCase;
exports.AbmPacienteUseCase = AbmPacienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paciente_entity_1.Paciente)),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmPacienteUseCase);
//# sourceMappingURL=abm-paciente.use-case.js.map