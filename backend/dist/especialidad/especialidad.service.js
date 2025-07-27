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
exports.EspecialidadService = void 0;
const common_1 = require("@nestjs/common");
const hospital_entity_1 = require("../hospital/entities/hospital.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let EspecialidadService = class EspecialidadService {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async buscarEspecialidades(idHospitalSeleccionado) {
        console.log('idHospitalSeleccionado: ', idHospitalSeleccionado);
        const criterios = {
            atributo: 'idHospital',
            operacion: '=',
            valor: idHospitalSeleccionado,
        };
        const hospitales = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hospital', [criterios], ['hospitalEspecialidades', 'hospitalEspecialidades.especialidad']);
        console.log('Estos son los hospitales que trae ', hospitales);
        const hospitalSeleccionado = hospitales[0];
        const epscialidadesDTO = [];
        const intermedias = hospitalSeleccionado.getHospitalEspecialidades();
        for (const intermedia of intermedias) {
            console.log('Estamos en el buscarEspecialidades');
            const fechaBajaIntermedia = intermedia.fechaHastaHospitalEspecialidad;
            if (fechaBajaIntermedia === null) {
                const especialidad = intermedia.getEspecialidad();
                const especialidadDTO = {
                    idEspecialidad: especialidad.getIdEspecialidad(),
                    nombreEspecialidad: especialidad.getNombreEspecialidad,
                };
                epscialidadesDTO.push(especialidadDTO);
            }
        }
        return epscialidadesDTO;
    }
};
exports.EspecialidadService = EspecialidadService;
exports.EspecialidadService = EspecialidadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], EspecialidadService);
//# sourceMappingURL=especialidad.service.js.map