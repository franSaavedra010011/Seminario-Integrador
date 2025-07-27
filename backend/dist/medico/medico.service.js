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
exports.MedicoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medico_entity_1 = require("./entities/medico.entity");
const typeorm_2 = require("typeorm");
const hospital_entity_1 = require("../hospital/entities/hospital.entity");
const especialidad_entity_1 = require("../especialidad/entities/especialidad.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
const hospital_especialidad_entity_1 = require("../hospital-especialidad/entities/hospital-especialidad.entity");
const especialidad_medico_entity_1 = require("../especialidad-medico/entities/especialidad-medico.entity");
const hospital_especialidad_medico_entity_1 = require("../hospital-especialidad-medico/entities/hospital-especialidad-medico.entity");
let MedicoService = class MedicoService {
    medicoRepo;
    hospitalRepo;
    especialidadRepo;
    especialidadMedicoRepo;
    hospitalEspecialidadRepo;
    hospitalEspecialidadMedicoRepo;
    genericRepositoryService;
    constructor(medicoRepo, hospitalRepo, especialidadRepo, especialidadMedicoRepo, hospitalEspecialidadRepo, hospitalEspecialidadMedicoRepo, genericRepositoryService) {
        this.medicoRepo = medicoRepo;
        this.hospitalRepo = hospitalRepo;
        this.especialidadRepo = especialidadRepo;
        this.especialidadMedicoRepo = especialidadMedicoRepo;
        this.hospitalEspecialidadRepo = hospitalEspecialidadRepo;
        this.hospitalEspecialidadMedicoRepo = hospitalEspecialidadMedicoRepo;
        this.genericRepositoryService = genericRepositoryService;
    }
    async create(dtoMedico) {
        const medicoNuevo = this.medicoRepo.create({
            nombreMedico: dtoMedico.nombreMedico,
            apellidoMedico: dtoMedico.apellidoMedico,
            dniMedico: dtoMedico.dniMedico,
            telMedico: dtoMedico.telefonoMedico,
            matriculaMedico: dtoMedico.matriculaMedico,
            tiempoConsulta: dtoMedico.tiempoConsultaMedico,
        });
        await this.medicoRepo.save(medicoNuevo);
        const hospitales = await this.genericRepositoryService.buscar(hospital_entity_1.Hospital, 'hospital', [
            {
                atributo: 'idHospital',
                operacion: '=',
                valor: dtoMedico.idHospital,
            },
        ], [
            'hospitalEspecialidades',
            'hospitalEspecialidades.especialidad',
            'hospitalEspecialidades.hospitalEspecialidadMedico',
        ]);
        for (const hospital of hospitales) {
            const hospitalEspecialidades = hospital.getHospitalEspecialidades();
            for (const hospitalEspecialidad of hospitalEspecialidades) {
                const especialidad = hospitalEspecialidad.getEspecialidad();
                const idEspecialidad = especialidad.getIdEspecialidad();
                for (const idEspecialidadSeleccionada of dtoMedico.especialidades) {
                    if (idEspecialidad === idEspecialidadSeleccionada) {
                        const hospitalEspecialidadMedicoNuevo = this.hospitalEspecialidadMedicoRepo.create({
                            fechaDesdeHospitalEspecialidadMedico: new Date(),
                        });
                        hospitalEspecialidadMedicoNuevo.setMedico(medicoNuevo);
                        await this.hospitalEspecialidadMedicoRepo.save(hospitalEspecialidadMedicoNuevo);
                        const hospitalEspecialidadModificar = hospitalEspecialidad.getHospitalEspecialidadMedico();
                        console.log('ACAAAAAAAAAA', hospitalEspecialidadModificar);
                        hospitalEspecialidadModificar.push(hospitalEspecialidadMedicoNuevo);
                        hospitalEspecialidad.setHospitalEspecialidadMedico(hospitalEspecialidadModificar);
                        await this.hospitalEspecialidadRepo.save(hospitalEspecialidad);
                        const especialidadMedicoNuevo = this.especialidadMedicoRepo.create({
                            fechaDesdeEspecialidadMedico: new Date(),
                        });
                        especialidadMedicoNuevo.setMedico(medicoNuevo);
                        especialidadMedicoNuevo.setEspecialidad(especialidad);
                        await this.especialidadMedicoRepo.save(especialidadMedicoNuevo);
                        const especialidadesMedico = especialidad.getEspecialidadesMedico() || [];
                        especialidadesMedico.push(especialidadMedicoNuevo);
                        especialidad.setEspecialidadesMedico(especialidadesMedico);
                    }
                }
            }
        }
        return medicoNuevo;
    }
    async findAll() {
        return this.medicoRepo.find({
            relations: ['hospital', 'especialidad'],
        });
    }
};
exports.MedicoService = MedicoService;
exports.MedicoService = MedicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(medico_entity_1.Medico)),
    __param(1, (0, typeorm_1.InjectRepository)(hospital_entity_1.Hospital)),
    __param(2, (0, typeorm_1.InjectRepository)(especialidad_entity_1.Especialidad)),
    __param(3, (0, typeorm_1.InjectRepository)(especialidad_medico_entity_1.EspecialidadMedico)),
    __param(4, (0, typeorm_1.InjectRepository)(hospital_especialidad_entity_1.HospitalEspecialidad)),
    __param(5, (0, typeorm_1.InjectRepository)(hospital_especialidad_medico_entity_1.HospitalEspecialidadMedico)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        genericRepository_service_1.GenericRepositoryService])
], MedicoService);
//# sourceMappingURL=medico.service.js.map