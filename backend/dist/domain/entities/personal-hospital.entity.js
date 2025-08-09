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
exports.PersonalHospital = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const hospital_entity_1 = require("./hospital.entity");
const usuario_entity_1 = require("./usuario.entity");
let PersonalHospital = class PersonalHospital extends base_entity_1.Base {
    fechaDesde;
    hospital;
    usuario;
};
exports.PersonalHospital = PersonalHospital;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PersonalHospital.prototype, "fechaDesde", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hospital_entity_1.Hospital, (hospital) => hospital.personalHospital),
    __metadata("design:type", hospital_entity_1.Hospital)
], PersonalHospital.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.personalHospital),
    __metadata("design:type", usuario_entity_1.Usuario)
], PersonalHospital.prototype, "usuario", void 0);
exports.PersonalHospital = PersonalHospital = __decorate([
    (0, typeorm_1.Entity)()
], PersonalHospital);
//# sourceMappingURL=personal-hospital.entity.js.map