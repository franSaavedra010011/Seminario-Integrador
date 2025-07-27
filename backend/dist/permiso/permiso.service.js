"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermisoService = void 0;
const common_1 = require("@nestjs/common");
let PermisoService = class PermisoService {
    create(createPermisoDto) {
        return 'This action adds a new permiso';
    }
    findAll() {
        return `This action returns all permiso`;
    }
    findOne(id) {
        return `This action returns a #${id} permiso`;
    }
    update(id, updatePermisoDto) {
        return `This action updates a #${id} permiso`;
    }
    remove(id) {
        return `This action removes a #${id} permiso`;
    }
};
exports.PermisoService = PermisoService;
exports.PermisoService = PermisoService = __decorate([
    (0, common_1.Injectable)()
], PermisoService);
//# sourceMappingURL=permiso.service.js.map