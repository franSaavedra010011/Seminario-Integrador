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
exports.UsuarioRolController = void 0;
const common_1 = require("@nestjs/common");
const usuario_rol_service_1 = require("./usuario-rol.service");
const create_usuario_rol_dto_1 = require("./dto/create-usuario-rol.dto");
const update_usuario_rol_dto_1 = require("./dto/update-usuario-rol.dto");
let UsuarioRolController = class UsuarioRolController {
    usuarioRolService;
    constructor(usuarioRolService) {
        this.usuarioRolService = usuarioRolService;
    }
    create(createUsuarioRolDto) {
        return this.usuarioRolService.create(createUsuarioRolDto);
    }
    findAll() {
        return this.usuarioRolService.findAll();
    }
    findOne(id) {
        return this.usuarioRolService.findOne(+id);
    }
    update(id, updateUsuarioRolDto) {
        return this.usuarioRolService.update(+id, updateUsuarioRolDto);
    }
    remove(id) {
        return this.usuarioRolService.remove(+id);
    }
};
exports.UsuarioRolController = UsuarioRolController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_rol_dto_1.CreateUsuarioRolDto]),
    __metadata("design:returntype", void 0)
], UsuarioRolController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioRolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioRolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_usuario_rol_dto_1.UpdateUsuarioRolDto]),
    __metadata("design:returntype", void 0)
], UsuarioRolController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioRolController.prototype, "remove", null);
exports.UsuarioRolController = UsuarioRolController = __decorate([
    (0, common_1.Controller)('usuario-rol'),
    __metadata("design:paramtypes", [usuario_rol_service_1.UsuarioRolService])
], UsuarioRolController);
//# sourceMappingURL=usuario-rol.controller.js.map