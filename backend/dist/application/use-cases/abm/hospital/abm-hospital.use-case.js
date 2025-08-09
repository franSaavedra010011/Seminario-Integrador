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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbmHospitalUseCase = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const hospital_entity_1 = require("../../../../domain/entities/hospital.entity");
let AbmHospitalUseCase = class AbmHospitalUseCase {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const duplicados = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hosp', [{ atributo: 'nombreHospital', operacion: '=', valor: dto.nombreHospital }]);
        if (duplicados.some(h => h.nombre.trim().toLowerCase() === dto.nombreHospital.trim().toLowerCase())) {
            throw new common_1.BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
        }
        const hospital = new hospital_entity_1.Hospital();
        hospital.nombre = dto.nombreHospital.trim();
        hospital.direccion = dto.direccionHospital.trim();
        hospital.email = dto.emailHospital?.trim() ?? '';
        hospital.telefono = dto.telHospital?.trim() ?? '';
        return await this.genericRepository.guardarCambios(hospital_entity_1.Hospital, hospital);
    }
    async actualizar(id, dto) {
        const encontrados = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hosp', [{ atributo: 'id', operacion: '=', valor: id }]);
        if (!encontrados.length || encontrados[0].fechaHoraBaja) {
            throw new common_1.NotFoundException(`Hospital con ID ${id} no encontrado`);
        }
        const hospital = encontrados[0];
        if (dto.nombreHospital && dto.nombreHospital.trim().toLowerCase() !== hospital.nombre.trim().toLowerCase()) {
            const duplicados = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hosp', [{ atributo: 'nombreHospital', operacion: '=', valor: dto.nombreHospital }]);
            if (duplicados.some(h => h.id !== hospital.id &&
                h.nombre.trim().toLowerCase() === dto.nombreHospital.trim().toLowerCase())) {
                throw new common_1.BadRequestException(`El hospital "${dto.nombreHospital}" ya existe`);
            }
            hospital.nombre = dto.nombreHospital.trim();
        }
        if (dto.direccionHospital !== undefined) {
            hospital.direccion = dto.direccionHospital?.trim() ?? null;
        }
        if (dto.emailHospital !== undefined) {
            hospital.email = dto.emailHospital?.trim() ?? null;
        }
        if (dto.telHospital !== undefined) {
            hospital.telefono = dto.telHospital?.trim() ?? null;
        }
        return await this.genericRepository.guardarCambios(hospital_entity_1.Hospital, hospital);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(hospital_entity_1.Hospital, id);
    }
};
exports.AbmHospitalUseCase = AbmHospitalUseCase;
exports.AbmHospitalUseCase = AbmHospitalUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], AbmHospitalUseCase);
//# sourceMappingURL=abm-hospital.use-case.js.map