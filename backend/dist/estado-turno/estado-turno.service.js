"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoTurnoService = void 0;
const common_1 = require("@nestjs/common");
let EstadoTurnoService = class EstadoTurnoService {
    create(createEstadoTurnoDto) {
        return 'This action adds a new estadoTurno';
    }
    findAll() {
        return `This action returns all estadoTurno`;
    }
    findOne(id) {
        return `This action returns a #${id} estadoTurno`;
    }
    update(id, updateEstadoTurnoDto) {
        return `This action updates a #${id} estadoTurno`;
    }
    remove(id) {
        return `This action removes a #${id} estadoTurno`;
    }
};
exports.EstadoTurnoService = EstadoTurnoService;
exports.EstadoTurnoService = EstadoTurnoService = __decorate([
    (0, common_1.Injectable)()
], EstadoTurnoService);
//# sourceMappingURL=estado-turno.service.js.map