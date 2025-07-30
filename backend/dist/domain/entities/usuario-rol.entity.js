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
exports.UsuarioRol = void 0;
const rol_entity_1 = require("./rol.entity");
const usuario_entity_1 = require("./usuario.entity");
const typeorm_1 = require("typeorm");
let UsuarioRol = class UsuarioRol {
    idUsuarioRol;
    fechaDesdeUsuarioRol;
    fechaHastaUsuarioRol;
    rol;
    usuario;
    get getIdUsuarioRol() {
        return this.idUsuarioRol;
    }
    get getFechaDesdeUsuarioRol() {
        return this.fechaDesdeUsuarioRol;
    }
    set setFechaDesdeUsuarioRol(value) {
        this.fechaDesdeUsuarioRol = value;
    }
    get getFechaHastaUsuarioRol() {
        return this.fechaHastaUsuarioRol;
    }
    set setFechaHastaUsuarioRol(value) {
        this.fechaHastaUsuarioRol = value;
    }
    get getRol() {
        return this.rol;
    }
    setRol(value) {
        this.rol = value;
    }
};
exports.UsuarioRol = UsuarioRol;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UsuarioRol.prototype, "idUsuarioRol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UsuarioRol.prototype, "fechaDesdeUsuarioRol", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UsuarioRol.prototype, "fechaHastaUsuarioRol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.usuarioRoles),
    __metadata("design:type", rol_entity_1.Rol)
], UsuarioRol.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.usuarioRoles),
    __metadata("design:type", usuario_entity_1.Usuario)
], UsuarioRol.prototype, "usuario", void 0);
exports.UsuarioRol = UsuarioRol = __decorate([
    (0, typeorm_1.Entity)()
], UsuarioRol);
//# sourceMappingURL=usuario-rol.entity.js.map