"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoTurnoModule = void 0;
const common_1 = require("@nestjs/common");
const estado_turno_service_1 = require("./estado-turno.service");
const estado_turno_controller_1 = require("./estado-turno.controller");
let EstadoTurnoModule = class EstadoTurnoModule {
};
exports.EstadoTurnoModule = EstadoTurnoModule;
exports.EstadoTurnoModule = EstadoTurnoModule = __decorate([
    (0, common_1.Module)({
        controllers: [estado_turno_controller_1.EstadoTurnoController],
        providers: [estado_turno_service_1.EstadoTurnoService],
    })
], EstadoTurnoModule);
//# sourceMappingURL=estado-turno.module.js.map