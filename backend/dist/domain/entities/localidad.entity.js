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
exports.Localidad = void 0;
const hospital_entity_1 = require("./hospital.entity");
const typeorm_1 = require("typeorm");
let Localidad = class Localidad {
    idLocalidad;
    nombreLocalidad;
    fechaHoraBajaLocalidad;
    hospitales;
    get getIdLocalidad() {
        return this.idLocalidad;
    }
    get getNombreLocalidad() {
        return this.nombreLocalidad;
    }
    set setNombreLocalidad(nombreLocalidad) {
        this.nombreLocalidad = nombreLocalidad;
    }
    get getFechaHoraBajaLocalidad() {
        return this.fechaHoraBajaLocalidad;
    }
    set setFechaHoraBajaLocalidad(fechaHoraBaja) {
        this.fechaHoraBajaLocalidad = fechaHoraBaja;
    }
};
exports.Localidad = Localidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Localidad.prototype, "idLocalidad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Localidad.prototype, "nombreLocalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Localidad.prototype, "fechaHoraBajaLocalidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hospital_entity_1.Hospital, (hospital) => hospital.localidad),
    __metadata("design:type", Array)
], Localidad.prototype, "hospitales", void 0);
exports.Localidad = Localidad = __decorate([
    (0, typeorm_1.Entity)()
], Localidad);
//# sourceMappingURL=localidad.entity.js.map