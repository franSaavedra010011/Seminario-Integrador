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
exports.AbmMedicoUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const genericRepository_service_1 = require("../../../../shared/utils/genericRepository.service");
const typeorm_2 = require("typeorm");
const medico_entity_1 = require("../../../../domain/entities/medico.entity");
const hospital_entity_1 = require("../../../../domain/entities/hospital.entity");
const especialidad_medico_entity_1 = require("../../../../domain/entities/especialidad-medico.entity");
const hospital_especialidad_entity_1 = require("../../../../domain/entities/hospital-especialidad.entity");
const hospital_especialidad_medico_entity_1 = require("../../../../domain/entities/hospital-especialidad-medico.entity");
let AbmMedicoUseCase = class AbmMedicoUseCase {
    especialidadMedicoRepo;
    hospitalEspecialidadMedicoRepo;
    hospitalEspecialidadRepo;
    genericRepository;
    constructor(especialidadMedicoRepo, hospitalEspecialidadMedicoRepo, hospitalEspecialidadRepo, genericRepository) {
        this.especialidadMedicoRepo = especialidadMedicoRepo;
        this.hospitalEspecialidadMedicoRepo = hospitalEspecialidadMedicoRepo;
        this.hospitalEspecialidadRepo = hospitalEspecialidadRepo;
        this.genericRepository = genericRepository;
    }
    async crear(dto) {
        const medico = new medico_entity_1.Medico();
        medico.nombreMedico = dto.nombreMedico;
        medico.apellidoMedico = dto.apellidoMedico;
        medico.dniMedico = dto.dniMedico;
        medico.telMedico = dto.telefonoMedico;
        medico.matriculaMedico = dto.matriculaMedico;
        medico.tiempoConsulta = dto.tiempoConsultaMedico;
        const medicoGuardado = await this.genericRepository.guardarCambios(medico_entity_1.Medico, medico);
        const hospitales = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hospital', [{ atributo: 'id', operacion: '=', valor: dto.idHospital }], [
            'hospitalEspecialidades',
            'hospitalEspecialidades.especialidad',
            'hospitalEspecialidades.hospitalEspecialidadMedico',
        ]);
        for (const hospital of hospitales) {
            for (const hospitalEspecialidad of hospital.hospitalEspecialidades) {
                const especialidad = hospitalEspecialidad.especialidad;
                if (dto.especialidades.includes(especialidad.id)) {
                    const hem = this.hospitalEspecialidadMedicoRepo.create({
                        fechaDesde: new Date(),
                        medico: medicoGuardado,
                    });
                    await this.hospitalEspecialidadMedicoRepo.save(hem);
                    hospitalEspecialidad.hospitalEspecialidadMedico = [
                        ...(hospitalEspecialidad.hospitalEspecialidadMedico || []),
                        hem,
                    ];
                    await this.hospitalEspecialidadRepo.save(hospitalEspecialidad);
                    const em = this.especialidadMedicoRepo.create({
                        fechaDesde: new Date(),
                        medico: medicoGuardado,
                        especialidad: especialidad,
                    });
                    await this.especialidadMedicoRepo.save(em);
                }
            }
        }
        return medicoGuardado;
    }
    async actualizar(id, dto) {
        const medicos = await this.genericRepository.buscar(medico_entity_1.Medico, 'medico', [
            { atributo: 'id', operacion: '=', valor: id },
        ]);
        if (!medicos.length) {
            throw new common_1.BadRequestException('Médico no encontrado');
        }
        const medico = medicos[0];
        Object.assign(medico, dto);
        return this.genericRepository.guardarCambios(medico_entity_1.Medico, medico);
    }
    async eliminar(id) {
        await this.genericRepository.eliminar(medico_entity_1.Medico, id);
    }
};
exports.AbmMedicoUseCase = AbmMedicoUseCase;
exports.AbmMedicoUseCase = AbmMedicoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(especialidad_medico_entity_1.EspecialidadMedico)),
    __param(1, (0, typeorm_1.InjectRepository)(hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico)),
    __param(2, (0, typeorm_1.InjectRepository)(hospital_especialidad_entity_1.HospitalEspecialidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        genericRepository_service_1.GenericRepositoryService])
], AbmMedicoUseCase);
//# sourceMappingURL=abm-medico.use-case.js.map