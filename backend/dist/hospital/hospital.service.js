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
exports.HospitalService = void 0;
const common_1 = require("@nestjs/common");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
const hospital_entity_1 = require("../domain/entities/hospital.entity");
let HospitalService = class HospitalService {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    async buscarHospitales() {
        const hospitales = await this.genericRepository.buscar(hospital_entity_1.Hospital, 'hospital', []);
        const hospitalesDTO = [];
        for (const hospital of hospitales) {
            const fechaBajaHospital = hospital.fechaHoraBajaHospital;
            if (fechaBajaHospital === null) {
                const hospitalDTO = {
                    nombreHospital: hospital.nombreHospital,
                    idHospital: hospital.getIdHospital,
                };
                hospitalesDTO.push(hospitalDTO);
            }
        }
        console.log(hospitalesDTO);
        return hospitalesDTO;
    }
};
exports.HospitalService = HospitalService;
exports.HospitalService = HospitalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], HospitalService);
//# sourceMappingURL=hospital.service.js.map