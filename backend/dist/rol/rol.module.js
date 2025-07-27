"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolModule = void 0;
const common_1 = require("@nestjs/common");
const rol_service_1 = require("./rol.service");
const rol_controller_1 = require("./rol.controller");
const genericRepository_service_1 = require("../common/utils/genericRepository.service");
let RolModule = class RolModule {
};
exports.RolModule = RolModule;
exports.RolModule = RolModule = __decorate([
    (0, common_1.Module)({
        controllers: [rol_controller_1.RolController],
        providers: [rol_service_1.RolService, genericRepository_service_1.GenericRepositoryService],
    })
], RolModule);
//# sourceMappingURL=rol.module.js.map