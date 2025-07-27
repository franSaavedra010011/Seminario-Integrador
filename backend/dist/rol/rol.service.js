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
exports.RolService = void 0;
const common_1 = require("@nestjs/common");
const rol_entity_1 = require("./entities/rol.entity");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let RolService = class RolService {
    genericRepository;
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    create(createRolDto) {
        return 'This action adds a new rol';
    }
    async buscarRoles() {
        const roles = await this.genericRepository.buscar(rol_entity_1.Rol, 'rol', []);
        const rolesDTO = [];
        for (const rol of roles) {
            console.log('Estamos en el buscar');
            console.log(rol.nombreRol);
            const fechaBajaRol = rol.fechaHoraBajaRol;
            if (fechaBajaRol === null) {
                const rolDTO = {
                    nombreRol: rol.nombreRol,
                    idRol: rol.getIdRol,
                };
                rolesDTO.push(rolDTO);
            }
        }
        console.log(rolesDTO);
        return rolesDTO;
    }
    findAll() {
        return `This action returns all rol`;
    }
    findOne(id) {
        return `This action returns a #${id} rol`;
    }
    update(id, updateRolDto) {
        return `This action updates a #${id} rol`;
    }
    remove(id) {
        return `This action removes a #${id} rol`;
    }
};
exports.RolService = RolService;
exports.RolService = RolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [genericRepository_service_1.GenericRepositoryService])
], RolService);
//# sourceMappingURL=rol.service.js.map