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
exports.UsuarioController = void 0;
const genericRepository_service_1 = require("./../../../shared/utils/genericRepository.service");
const common_1 = require("@nestjs/common");
const abm_usuario_use_case_1 = require("../../../application/use-cases/abm/usuario/abm-usuario.use-case");
const create_usuario_dto_1 = require("../../../application/use-cases/abm/usuario/dto/create-usuario.dto");
const update_usuario_dto_1 = require("../../../application/use-cases/abm/usuario/dto/update-usuario.dto");
const usuario_entity_1 = require("../../../domain/entities/usuario.entity");
let UsuarioController = class UsuarioController {
    abmUsuarioUseCase;
    GenericRepositoryService;
    constructor(abmUsuarioUseCase, GenericRepositoryService) {
        this.abmUsuarioUseCase = abmUsuarioUseCase;
        this.GenericRepositoryService = GenericRepositoryService;
    }
    async alta(dto) {
        return this.abmUsuarioUseCase.crear(dto);
    }
    async modificacion(id, dto) {
        return this.abmUsuarioUseCase.actualizar(id, dto);
    }
    async baja(id) {
        return this.GenericRepositoryService.eliminar(usuario_entity_1.Usuario, id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)('alta'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "alta", null);
__decorate([
    (0, common_1.Put)('modificacion/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "modificacion", null);
__decorate([
    (0, common_1.Delete)('baja/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "baja", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [abm_usuario_use_case_1.AbmUsuarioUseCase,
        genericRepository_service_1.GenericRepositoryService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map