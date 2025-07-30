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
exports.Permiso = void 0;
const rol_permiso_entity_1 = require("./rol-permiso.entity");
const typeorm_1 = require("typeorm");
let Permiso = class Permiso {
    idPermiso;
    rutaPermiso;
    fechaHoraBajaPermiso;
    rolesPermiso;
    get getIdPermiso() {
        return this.idPermiso;
    }
    get getRutaPermiso() {
        return this.rutaPermiso;
    }
    set setRutaPermiso(ruta) {
        this.rutaPermiso = ruta;
    }
    get getFechaHoraBajaPermiso() {
        return this.fechaHoraBajaPermiso;
    }
    set setFechaHoraBajaPermiso(fecha) {
        this.fechaHoraBajaPermiso = fecha;
    }
};
exports.Permiso = Permiso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permiso.prototype, "idPermiso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permiso.prototype, "rutaPermiso", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Permiso.prototype, "fechaHoraBajaPermiso", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rol_permiso_entity_1.RolPermiso, (rolPermiso) => rolPermiso.permiso),
    __metadata("design:type", Array)
], Permiso.prototype, "rolesPermiso", void 0);
exports.Permiso = Permiso = __decorate([
    (0, typeorm_1.Entity)()
], Permiso);
//# sourceMappingURL=permiso.entity.js.map