"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongestionActualService = void 0;
const common_1 = require("@nestjs/common");
let CongestionActualService = class CongestionActualService {
    create(createCongestionActualDto) {
        return 'This action adds a new congestionActual';
    }
    findAll() {
        return `This action returns all congestionActual`;
    }
    findOne(id) {
        return `This action returns a #${id} congestionActual`;
    }
    update(id, updateCongestionActualDto) {
        return `This action updates a #${id} congestionActual`;
    }
    remove(id) {
        return `This action removes a #${id} congestionActual`;
    }
};
exports.CongestionActualService = CongestionActualService;
exports.CongestionActualService = CongestionActualService = __decorate([
    (0, common_1.Injectable)()
], CongestionActualService);
//# sourceMappingURL=congestion-actual.service.js.map