"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePacienteNotificacionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_paciente_notificacion_dto_1 = require("./create-paciente-notificacion.dto");
class UpdatePacienteNotificacionDto extends (0, mapped_types_1.PartialType)(create_paciente_notificacion_dto_1.CreatePacienteNotificacionDto) {
}
exports.UpdatePacienteNotificacionDto = UpdatePacienteNotificacionDto;
//# sourceMappingURL=update-paciente-notificacion.dto.js.map