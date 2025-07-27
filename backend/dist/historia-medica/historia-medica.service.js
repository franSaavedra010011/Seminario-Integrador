"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriaMedicaService = void 0;
const common_1 = require("@nestjs/common");
let HistoriaMedicaService = class HistoriaMedicaService {
    create(createHistoriaMedicaDto) {
        return 'This action adds a new historiaMedica';
    }
    findAll() {
        return `This action returns all historiaMedica`;
    }
    findOne(id) {
        return `This action returns a #${id} historiaMedica`;
    }
    update(id, updateHistoriaMedicaDto) {
        return `This action updates a #${id} historiaMedica`;
    }
    remove(id) {
        return `This action removes a #${id} historiaMedica`;
    }
};
exports.HistoriaMedicaService = HistoriaMedicaService;
exports.HistoriaMedicaService = HistoriaMedicaService = __decorate([
    (0, common_1.Injectable)()
], HistoriaMedicaService);
//# sourceMappingURL=historia-medica.service.js.map