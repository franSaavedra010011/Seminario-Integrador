"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guard/auth.guard");
const roles_guard_1 = require("../guard/roles.guard");
const permisos_guard_1 = require("../guard/permisos.guard");
const roles_decorator_1 = require("./roles.decorator");
const permisos_decorator_1 = require("./permisos.decorator");
function Auth(roles = [], permisos = []) {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, permisos_guard_1.PermisosGuard), roles.length ? (0, roles_decorator_1.Roles)(...roles.map(String)) : (target, key, desc) => desc, permisos.length ? (0, permisos_decorator_1.Permisos)(...permisos.map(String)) : (target, key, desc) => desc);
}
//# sourceMappingURL=auth.decorator.js.map