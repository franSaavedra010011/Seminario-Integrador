"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalidadService = void 0;
const common_1 = require("@nestjs/common");
let LocalidadService = class LocalidadService {
    create(createLocalidadDto) {
        return 'This action adds a new localidad';
    }
    findAll() {
        return `This action returns all localidad`;
    }
    findOne(id) {
        return `This action returns a #${id} localidad`;
    }
    update(id, updateLocalidadDto) {
        return `This action updates a #${id} localidad`;
    }
    remove(id) {
        return `This action removes a #${id} localidad`;
    }
};
exports.LocalidadService = LocalidadService;
exports.LocalidadService = LocalidadService = __decorate([
    (0, common_1.Injectable)()
], LocalidadService);
//# sourceMappingURL=localidad.service.js.map