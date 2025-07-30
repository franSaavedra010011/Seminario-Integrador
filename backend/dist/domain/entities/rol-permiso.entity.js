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
exports.RolPermiso = void 0;
const permiso_entity_1 = require("./permiso.entity");
const rol_entity_1 = require("./rol.entity");
const typeorm_1 = require("typeorm");
let RolPermiso = class RolPermiso {
    idRolPermiso;
    fechaDesdeRolPermiso;
    fechaHastaRolPermiso;
    permiso;
    rol;
    get getIdRolPermiso() {
        return this.idRolPermiso;
    }
    get getFechaDesdeRolPermiso() {
        return this.fechaDesdeRolPermiso;
    }
    set setFechaDesdeRolPermiso(fecha) {
        this.fechaDesdeRolPermiso = fecha;
    }
    get getFechaHastaRolPermiso() {
        return this.fechaHastaRolPermiso;
    }
    set setFechaHastaRolPermiso(fecha) {
        this.fechaHastaRolPermiso = fecha;
    }
    get getPermiso() {
        return this.permiso;
    }
    set setPermiso(permiso) {
        this.permiso = permiso;
    }
};
exports.RolPermiso = RolPermiso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RolPermiso.prototype, "idRolPermiso", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RolPermiso.prototype, "fechaDesdeRolPermiso", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], RolPermiso.prototype, "fechaHastaRolPermiso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permiso_entity_1.Permiso, (permiso) => permiso.rolesPermiso),
    __metadata("design:type", permiso_entity_1.Permiso)
], RolPermiso.prototype, "permiso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.rolPermisos),
    __metadata("design:type", rol_entity_1.Rol)
], RolPermiso.prototype, "rol", void 0);
exports.RolPermiso = RolPermiso = __decorate([
    (0, typeorm_1.Entity)()
], RolPermiso);
//# sourceMappingURL=rol-permiso.entity.js.map