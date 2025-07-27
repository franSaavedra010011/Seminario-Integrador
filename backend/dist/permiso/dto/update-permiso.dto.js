"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermisoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_permiso_dto_1 = require("./create-permiso.dto");
class UpdatePermisoDto extends (0, mapped_types_1.PartialType)(create_permiso_dto_1.CreatePermisoDto) {
}
exports.UpdatePermisoDto = UpdatePermisoDto;
//# sourceMappingURL=update-permiso.dto.js.map