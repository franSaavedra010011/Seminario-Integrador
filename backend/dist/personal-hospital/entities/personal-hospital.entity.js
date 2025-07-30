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
const hospital_entity_1 = require("../../domain/entities/hospital.entity");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const typeorm_1 = require("typeorm");
let PersonalHospital = class PersonalHospital {
    idPersonalHospital;
    fechaDesdePersonalHospital;
    fechaHastaPersonalHospital;
    hospital;
    usuario;
    get getIdPersonalHospital() {
        return this.idPersonalHospital;
    }
    get getFechaDesdePersonalHospital() {
        return this.fechaDesdePersonalHospital;
    }
    set setFechaDesdePersonalHospital(fecha) {
        this.fechaDesdePersonalHospital = fecha;
    }
    get getFechaHastaPersonalHospital() {
        return this.fechaHastaPersonalHospital;
    }
    set setFechaHastaPersonalHospital(fecha) {
        this.fechaHastaPersonalHospital = fecha;
    }
    get getHospital() {
        return this.hospital;
    }
    set setHospital(hospital) {
        this.hospital = hospital;
    }
};
exports.PersonalHospital = PersonalHospital;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PersonalHospital.prototype, "idPersonalHospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PersonalHospital.prototype, "fechaDesdePersonalHospital", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], PersonalHospital.prototype, "fechaHastaPersonalHospital", void 0);
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